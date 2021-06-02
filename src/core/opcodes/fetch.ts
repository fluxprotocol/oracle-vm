import fetch from 'node-fetch';
import Context from "../models/Context";
import { Opcode, OpcodeLine } from "../models/Opcode";

/** 
 * Fetches a resource from the given URL
 * 
 * Example: ["FETCH", "$a", "https://pokeapi.co/api/v2/pokemon/748/"]
 * 
 * [0] - Opcode name FETCH
 * [1] - Variable to store result to
 * [2] - URL to fetch
 */
const fetchOpcode: Opcode = {
    gas: 1,
    execute: async (line: OpcodeLine, context: Context) => {
        const memoryTarget = line[1] as string;
        const url = line[2] as string;
        const response = await fetch(url);

        if (!response.ok) {
            const body = await response.text();
            throw new Error(`URL returned a non OK response ${response.status} - ${body}`);
        }

        const result = await response.text();
        context.memory.set(memoryTarget, {
            type: 'json',
            value: result,
        });
    }
}

export default fetchOpcode;