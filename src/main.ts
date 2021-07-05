import Context from "./core/models/Context";
import { Code } from "./core/models/Code";
import { DebugInfo, ExecuteResult } from "./core/models/ExecuteResult";
import { executeOpcode } from "./core/OpcodeExecutor";
import Big from "big.js";

// Prevents scientific notation of numbers
Big.PE = 1000000000;

interface ExecuteOptions {
    context?: Context;
    debug?: boolean;
}

export async function executeCode(code: Code, options: ExecuteOptions = {}): Promise<ExecuteResult> {
    const context = options.context ?? new Context();

    let debugInfo: DebugInfo | undefined = undefined;
    let currentPointer = context.programCounter;

    if (options.debug) {
        debugInfo = {
            steps: [],
        };
    }

    try {
        while(true) {
            currentPointer = context.programCounter;
            const line = code[currentPointer];

            if (!line) {
                return {
                    code: 1,
                    message: 'No RETURN opcode triggered',
                    context,
                    debugInfo,
                }
            }

            await executeOpcode(line, context);
            
            // Program counter has not been updated due a opcode
            // We can safely move on to the next opcode
            if (context.programCounter === currentPointer) {
                context.programCounter += 1;
            }

            debugInfo?.steps.push({
                context: context.clone(),
                opcode: code[currentPointer][0] as string,
                line: currentPointer,
            });

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
    } catch (error) {
        return {
            code: 1,
            message: `${error.toString()} - @op:${currentPointer}:${code[currentPointer][0]}`,
            context,
            debugInfo,
        }
    }
}

export { Context };