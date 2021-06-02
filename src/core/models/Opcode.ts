import Context from "./Context";

export interface Opcode {
    gas: number;
    execute: (line: OpcodeLine, context: Context) => Promise<void>;
}

export type OpcodeLine = (string | string[][])[];