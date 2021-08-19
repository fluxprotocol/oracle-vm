import { MethodCallMessage } from "./models/WorkerMessage";
import { call } from './services/CallService';
import { sendBufferLengthToWorker, storeAndNotify } from "./services/WorkerService";

class ProcessMethods {
    private result?: Buffer;

    constructor(private notifierBuffer: SharedArrayBuffer) {}

    private async call(args: any[]) {
        try {
            const result = await call(args[0]);
            this.result = Buffer.from(JSON.stringify(result));

            sendBufferLengthToWorker(this.notifierBuffer, this.result);
        } catch(error) {
            console.error('[call]', error);
        }
    }

    private async writeResultToBuffer(args: any[]) {
        const u8WriteBuffer = new Uint8Array(args[0] as SharedArrayBuffer);
        u8WriteBuffer.set(this.result ?? Buffer.from([]));
        storeAndNotify(this.notifierBuffer, 0, 1);
    }

    executeMethodCallMessage(message: MethodCallMessage) {
        if (message.value.methodName === 'call') {
            this.call(message.value.args);
        } else if (message.value.methodName === 'writeResultToBuffer') {
            this.writeResultToBuffer(message.value.args);
        }
    }
}

export default ProcessMethods;