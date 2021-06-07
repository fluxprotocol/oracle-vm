import Context from '../models/Context';
import { Opcode, OpcodeLine } from '../models/Opcode';
import { getMemory, injectVariable } from '../services/MemoryService';

/** 
 * Quits the process and returns the value
 * 
 * Example: ["RETURN", "$a"]
 * 
 * [0] - Opcode name FETCH
 * [1] - Variable to return
 */
const returnOpcode: Opcode = {
    gas: 0,
    execute: async (line: OpcodeLine, context: Context) => {
        const memoryLocation = line[1] as string;
        context.result = getMemory(memoryLocation, context, []).value;
    }
}

export default returnOpcode;