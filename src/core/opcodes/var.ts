import Context from "../models/Context";
import { MemoryType } from "../models/Memory";
import { Opcode, OpcodeLine } from "../models/Opcode";
import { injectVariable } from "../services/MemoryService";
import { validateType } from "../services/TypeService";

/**
 * Fetches a resource from the given URL
 *
 * Example: ["VAR", "$a", "1000", "u128"]
 *
 * [0] - Opcode name VAR
 * [1] - Variable to store result to
 * [2] - Value of the variable
 * [3] - Type of the variable
 */
const varOpcode: Opcode = {
    gas: 2,
    execute: async (line: OpcodeLine, context: Context) => {
        const memoryTarget = line[1] as string;
        const value = line[2] as string;
        const valueType = line[3] as MemoryType;
        const finalValue = injectVariable(value, context);

        validateType(finalValue, valueType);

        context.memory.set(memoryTarget, {
            type: valueType,
            value: finalValue,
        });
    }
}

export default varOpcode;