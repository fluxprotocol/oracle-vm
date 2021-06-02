import Context from "./core/models/Context";
import { Code } from "./core/models/Code";
import { ExecuteResult } from "./core/models/ExecuteResult";
import { executeOpcode } from "./core/OpcodeExecutor";

export async function executeCode(code: Code): Promise<ExecuteResult> {
    const context = new Context();

    while(code.length) {
        const line = code.pop();

        if (!line) {
            return {
                code: 1,
                message: '',
                context,
            }
        }

        await executeOpcode(line, context);
    }

    return {
        code: 1,
        message: '',
        context,
    }
}

export { Context };