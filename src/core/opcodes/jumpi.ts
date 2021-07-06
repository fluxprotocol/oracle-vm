import Context from "../models/Context";
import { NON_FLOATING_NUMBERS } from "../models/Memory";
import { Opcode, OpcodeLine } from "../models/Opcode";
import { getMemory } from "../services/MemoryService";

/**
 * Jumps to a destination on a condition
 */
const jumpiOpcode: Opcode = {
    gas: 10,
    execute: async (line: OpcodeLine, context: Context) => {
        const destinationMemoryLocation = line[1] as string;
        const coniditionMemoryLocation = line[2] as string;

        const destination = getMemory(destinationMemoryLocation, context, NON_FLOATING_NUMBERS);
        const condition = getMemory(coniditionMemoryLocation, context, ['boolean']);

        if (condition.value !== 'true') {
            return;
        }

        context.programCounter = Number(destination.value);
    }
}

export default jumpiOpcode;