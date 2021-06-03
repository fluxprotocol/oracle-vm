import Context from "./Context";

export interface DebugInfo {

}
export interface ExecuteResult {
    debug?: DebugInfo;
    result: string;
    code: number;
    message: string;
    context: Context;
}