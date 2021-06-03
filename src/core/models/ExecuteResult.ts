import Context from "./Context";

export interface DebugStep {
    context: Context;
    opcode: string;
    line: number;
}

export interface DebugInfo {
    steps: DebugStep[];
}

export interface ExecuteResult {
    debugInfo?: DebugInfo;
    result: string;
    code: number;
    message: string;
    context: Context;
}