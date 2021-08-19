import { EventEmitter } from 'events';
import { Context } from "./models/Context";
import { Worker } from 'worker_threads';
import { URL as NodeURL } from "url";
import { extractMessageFromEvent } from './services/WorkerService';
import { MessageType, RequestMessage } from './models/WorkerMessage';
import ProcessMethods from './ProcessMethods';
import { ExecuteResult, LoggedOutcome } from './models/ExecuteResult';
import ICache from './models/Cache';
import InMemoryCache from './models/InMemoryCache';

export default class Process extends EventEmitter {
    private processMethods: ProcessMethods;
    private notifierBuffer = new SharedArrayBuffer(16);

    constructor(
        public context: Context, 
        private cache: ICache = new InMemoryCache()
    ) {
        super();
        this.processMethods = new ProcessMethods(this.notifierBuffer);
    }

    async spawn() {
        const worker = new Worker(new URL('./Process.worker.ts', import.meta.url) as NodeURL);
        const binaryId = this.context.args[0];

        worker.addListener('message', async (event: MessageEvent) => {
            const data = extractMessageFromEvent(event);

            if (data.type === MessageType.Exit) {
                await worker.terminate();
                this.emit('exit', data.value);
            } else if (data.type === MessageType.MethodCall) {
                this.processMethods.executeMethodCallMessage(data);
            } else if (data.type === MessageType.Cache) {
                this.cache.set(binaryId, data.value.binary);
            }
        });

        const cachedBinary = await this.cache.get(binaryId);

        const spawnMessage: RequestMessage = {
            type: MessageType.Spawn,
            value: {
                context: {
                    ...this.context,
                    isFromCache: cachedBinary ? true : false,
                    binary: cachedBinary ?? this.context.binary,
                    notifierBuffer: this.notifierBuffer,
                },
            },
        };

        worker.postMessage(spawnMessage);
    }
}

export function execute(context: Context, cache: ICache = new InMemoryCache()): Promise<ExecuteResult> {
    return new Promise((resolve) => {
        const process = new Process(context, cache);
        
        process.on('exit', (result: ExecuteResult) => {
            resolve(result);
        });

        process.spawn();
    });
}

export { ICache, InMemoryCache, Context, LoggedOutcome };