import Big from 'big.js';
import { ProcessEnvOptions } from 'child_process';

export interface Context {
    binary: Uint8Array;
    randomSeed: string;
    startingGas?: string;
    gasLimit: string;
    args: string[];
    env: ProcessEnvOptions['env'];
    timestamp: number;
}

export interface WorkerContext extends Context {
    isFromCache: boolean;
    notifierBuffer: SharedArrayBuffer;
}

export class VmContext {
    gasUsed: Big;
    binary: Uint8Array;
    randomSeed: string;
    gasLimit: string;
    args: string[];
    env: ProcessEnvOptions['env'];
    notifierBuffer: SharedArrayBuffer;
    timestamp: number;

    constructor(context: WorkerContext) {
        this.gasUsed = new Big(context.startingGas ?? '0');
        this.binary = context.binary;
        this.randomSeed = context.randomSeed;
        this.gasLimit = context.gasLimit;
        this.args = context.args;
        this.notifierBuffer = context.notifierBuffer;
        this.timestamp = context.timestamp;
        this.env = {
            ...context.env,
            GAS_LIMIT: this.gasLimit,
        }
    }

    useGas(gas: number) {
        this.gasUsed = this.gasUsed.add(gas);

        if (this.gasUsed.gt(this.gasLimit)) {
            throw new Error('ERR_OUT_OF_GAS');
        }
    }
}