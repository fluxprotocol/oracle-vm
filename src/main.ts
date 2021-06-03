import Context from "./core/models/Context";
import { Code } from "./core/models/Code";
import { ExecuteResult } from "./core/models/ExecuteResult";
import { executeOpcode } from "./core/OpcodeExecutor";

interface ExecuteOptions {
    context?: Context;
    debug?: boolean;
}

export async function executeCode(code: Code, options: ExecuteOptions = {}): Promise<ExecuteResult> {
    const context = options.context ?? new Context();
    let currentLine = 0;

    try {
        for await (let [index, line] of code.entries()) {
            currentLine = index;

            await executeOpcode(line, context);

            if (context.result) {
                return {
                    code: 0,
                    context,
                    result: context.result,
                    message: '',
                };
            }
        }
    
        return {
            code: 1,
            message: 'No RETURN opcode triggered',
            context,
            result: '',
        }
    } catch (error) {
        return {
            code: 1,
            message: `${error.toString()} - @op:${currentLine}:${code[currentLine][0]}`,
            context,
            result: '',
        }
    }
}

export { Context };