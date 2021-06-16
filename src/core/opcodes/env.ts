import Context from "../models/Context";
import { Opcode, OpcodeLine } from "../models/Opcode";
import { setMemory } from "../services/MemoryService";

/**
 * Stores an environment variable in memory in order to be used
 * 
 * Example: ["ENV", "$a", "args"] / ["ENV", "$a", "gasUsed"]
 * 
 * [0] - Opcode name ENV
 * [1] - Variable to store the result to
 * [2] - Name of the environment variable
 */
const envOpcode: Opcode = {
    gas: 5,
    execute: async (line: OpcodeLine, context: Context) => {
        const memoryTarget = line[1] as string;
        const envProperty = line[2] as string;
        const result = context.getEnvVariable(envProperty);

        setMemory(context, memoryTarget, result);
    }
}

export default envOpcode;