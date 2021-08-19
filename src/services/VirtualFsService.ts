import { WasmFs } from '@wasmer/wasmfs';

const CONSOLE_FDS = [0, 1, 2];

class VirtualFs {
    private logs?: string = undefined;

    constructor(private wasmFs: WasmFs) {}

    getFs() {
        const fs = this.wasmFs.fs;

        const originalWriteSync = fs.writeSync;
        fs.writeSync = (...args: any[]) => {
            const fd = args[0];

            if (CONSOLE_FDS.includes(fd)) {
                if (this.logs) {
                    this.logs += new TextDecoder().decode(args[1]);
                } else {
                    this.logs = new TextDecoder().decode(args[1]);
                }
            }

            // @ts-ignore
            return originalWriteSync(...args);
        }

        return fs;
    } 

    getLogOutput(): string[] {
        return this.logs?.split('\n') ?? [];
    }
}

export default VirtualFs;