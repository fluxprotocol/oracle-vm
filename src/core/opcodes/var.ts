import Context, { MemoryType } from "../models/Context";
import { Opcode, OpcodeLine } from "../models/Opcode";
import { validateType } from "../services/TypeService";

const varOpcode: Opcode = {
    gas: 1,
    execute: async (line: OpcodeLine, context: Context) => {
        const memoryTarget = line[1] as string;
        const value = line[2] as string;
        const valueType = line[3] as MemoryType;

        validateType(value, valueType);

        context.memory.set(memoryTarget, {
            type: valueType,
            value,
        });
    }
}

export default varOpcode;