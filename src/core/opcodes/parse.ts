import at from 'lodash.at';

import Context from '../models/Context';
import { MemoryType } from '../models/Memory';
import { Opcode, OpcodeLine } from '../models/Opcode';
import { getMemory, setMemory } from '../services/MemoryService';
import { validateType } from '../services/TypeService';

/** 
 * Parses a json or array and stores the result in memory
 * 
 * Example: ["PARSE", "$b", "$a", "abilities[0].ability.name", "string"]
 * 
 * [0] - Opcode name PARSE
 * [1] - Variable to store result to
 * [2] - Variable in memory to parse
 * [3] - The path of the json/array to find the value
 * [4] - Type of the result value
 */
const parseOpcode: Opcode = {
    gas: 50,
    execute: async (line: OpcodeLine, context: Context) => {
        const memoryTarget = line[1] as string;
        const fromLocation = line[2] as MemoryType;
        const path = line[3] as string;
        const valueType = line[4] as MemoryType;

        const value = getMemory(fromLocation, context, ['array', 'json']);
        const result = at(JSON.parse(value.value), [path])[0];

        validateType(result, valueType);

        setMemory(context, memoryTarget, {
            type: valueType,
            value: result,
        });
    }
}

export default parseOpcode;