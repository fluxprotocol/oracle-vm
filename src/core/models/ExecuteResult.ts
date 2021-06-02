import Context from "./Context";

export interface SuccessExecuteResult {
    code: number;
    result: string;
    context: Context;
}

export interface FailedExecutedResult {
    code: number;
    message: string;
    context: Context;
}

export type ExecuteResult = SuccessExecuteResult | FailedExecutedResult;