import { WASI } from '@wasmer/wasi/lib';
import WASIBindings from '@wasmer/wasi/lib/bindings/node';
import { WasmFs } from '@wasmer/wasmfs';
import Big from 'big.js';
import { alea } from 'seedrandom';
import { VmContext } from "../models/Context";
import { ExecuteResult } from '../models/ExecuteResult';
import { generateFixedBuffer } from './CryptoService';
import VirtualFs from './VirtualFsService';
import WasmImports from './WasmImports';

export function executeWasm(context: VmContext): Promise<ExecuteResult> {
    return new Promise(async (resolve) => {
        const wasmFs = new WasmFs();
        const virtualFs = new VirtualFs(wasmFs);
        
        try {
            const random = alea(context.randomSeed);
            const wasi = new WASI({
                args: context.args,
                env: context.env,
                bindings: {
                    ...WASIBindings,
                    fs: virtualFs.getFs(),
                    hrtime: () => BigInt(new Big(context.timestamp).mul(1_000_000).toString()),
                    randomFillSync: (buffer: any, offset, size) => {
                        const randomBuffer = generateFixedBuffer(random.int32().toString(), size ?? buffer.length - offset);
                        buffer.set(randomBuffer, offset);
                        return buffer;
                    },
                    exit: (rval: number) => {
                        resolve({
                            code: rval,
                            gasUsed: context.gasUsed.toString(),
                            logs: virtualFs.getLogOutput(),
                        });
                    },
                },
            });
    
            const module = await WebAssembly.compile(context.binary);
            const wasiImports = wasi.getImports(module);
            const wasmImports = new WasmImports(context, wasiImports);
            const instance = await WebAssembly.instantiate(module, wasmImports.getImports());
    
            wasmImports.setMemory(instance.exports.memory as WebAssembly.Memory);
            wasi.start(instance);
        
            resolve({
                code: 0,
                logs: virtualFs.getLogOutput(),
                gasUsed: context.gasUsed.toString(),
            });
        } catch(error: any) {
            const logs = virtualFs.getLogOutput();

            // Runtime errors should be handled by logs
            if (!(error instanceof WebAssembly.RuntimeError)) {
                logs.push(error?.message);
            }

            resolve({
                code: error?.code ?? 1,
                logs,
                gasUsed: context.gasUsed.toString(),
            });
        }
    });
}