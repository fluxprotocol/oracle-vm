import { VmContext } from '../models/Context';
import { callMethodOnMainThread } from './WorkerService';

export default class WasmImports {
    private memory?: WebAssembly.Memory;
    private lastCallResult?: Buffer;

    constructor(
        private vmContext: VmContext, 
        private wasiImports: Record<string, Record<string, Function>>,
    ) {}

    private httpCall(callDataOffset: number, callDataLength: number) {
        if (!this.memory) throw new ReferenceError('ERR_NO_MEMORY');
        const callDataBytes = new Uint8Array(this.memory.buffer, callDataOffset, callDataLength);
        const callDataString = new TextDecoder().decode(callDataBytes);
        const resultBuffer = callMethodOnMainThread(this.vmContext.notifierBuffer, 'call', [callDataString]);

        this.lastCallResult = resultBuffer;
    }

    private callResultCopy(resultOffset: number) {
        if (!this.memory) throw new ReferenceError('ERR_NO_MEMORY');
        if (!this.lastCallResult) throw new ReferenceError('ERR_NOT_RESULT');

        const memory = new Uint8Array(
            this.memory.buffer,
            resultOffset,
            this.lastCallResult.length
        );

        memory.set(this.lastCallResult);
    }

    public setMemory(memory: WebAssembly.Memory) {
        this.memory = memory;
    }

    public getImports() {
        return {
            ...this.wasiImports,
            metering: {
                usegas: (gas: number) => this.vmContext.useGas(gas),
            },
            env: {
                http_call: this.httpCall.bind(this),
                call_result_size: () => this.lastCallResult?.length ?? 0,
                call_result_copy: (resultOffset: number) => this.callResultCopy(resultOffset),
                gas_used: () => this.vmContext.gasUsed.toNumber(),
            },
        };
    }
}
