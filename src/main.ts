import Context from "./core/models/Context";
import { Code } from "./core/models/Code";
import { DebugInfo, ExecuteResult } from "./core/models/ExecuteResult";
import { executeOpcode } from "./core/OpcodeExecutor";

interface ExecuteOptions {
    context?: Context;
    debug?: boolean;
}

export async function executeCode(code: Code, options: ExecuteOptions = {}): Promise<ExecuteResult> {
    let currentLine = 0;
    const context = options.context ?? new Context();
    let debugInfo: DebugInfo | undefined = undefined;

    if (options.debug) {
        debugInfo = {
            steps: [],
        };
    }

    try {
        for await (let [index, line] of code.entries()) {
            currentLine = index;

            await executeOpcode(line, context);

            debugInfo?.steps.push({
                context: context.clone(),
                opcode: code[index][0] as string,
                line: index,
            });

            // We should not exceed the gas limit
            if (context.gasUsed > context.gasLimit) {
                return {
                    code: 1,
                    context,
                    debugInfo,
                    message: `Gas limit exceeded ${context.gasUsed}/${context.gasLimit} - @op:${currentLine}:${code[currentLine][0]}`,
                };
            }

            if (context.result) {
                return {
                    code: 0,
                    context,
                    result: context.result,
                    debugInfo,
                    message: '',
                };
            }
        }

        return {
            code: 1,
            message: 'No RETURN opcode triggered',
            context,
            debugInfo,
        }
    } catch (error) {
        return {
            code: 1,
            message: `${error.toString()} - @op:${currentLine}:${code[currentLine][0]}`,
            context,
            debugInfo,
        }
    }
}

export { Context };