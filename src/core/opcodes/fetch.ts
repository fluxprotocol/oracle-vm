import fetch from 'node-fetch';
import Context from "../models/Context";
import { Opcode, OpcodeLine } from "../models/Opcode";
import { getMemory, injectVariable, setMemory } from '../services/MemoryService';

/** 
 * Fetches a resource from the given URL
 * 
 * Example: ["FETCH", "$a", "$url"]
 * 
 * [0] - Opcode name FETCH
 * [1] - Variable to store result to
 * [2] - Variable that points to a string containing an URL
 */
const fetchOpcode: Opcode = {
    gas: 100,
    execute: async (line: OpcodeLine, context: Context) => {
        const memoryTarget = line[1] as string;
        const memoryLocation = line[2] as string;

        const entry = getMemory(memoryLocation, context, ['string']);
        const response = await fetch(entry.value);

        if (!response.ok) {
            const body = await response.text();
            throw new Error(`URL returned a non OK response ${response.status} - ${body}`);
        }

        const result = await response.text();

        setMemory(context, memoryTarget, {
            type: 'json',
            value: result,
        });
    }
}

export default fetchOpcode;