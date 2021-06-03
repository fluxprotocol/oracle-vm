import Context from '../models/Context';
import { Opcode, OpcodeLine } from '../models/Opcode';
import { injectVariable } from '../services/MemoryService';

/** 
 * Quits the process and returns the value
 * 
 * Example: ["RETURN", "$a"]
 * 
 * [0] - Opcode name FETCH
 * [1] - Templace to return. Variables will be replaced
 */
const returnOpcode: Opcode = {
    gas: 1,
    execute: async (line: OpcodeLine, context: Context) => {
        const template = line[1] as string;
        const result = injectVariable(template, context);

        context.result = result;
    }
}

export default returnOpcode;