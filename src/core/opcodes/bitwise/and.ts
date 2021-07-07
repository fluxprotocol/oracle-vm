import Big from "big.js";
import BN from 'bn.js';
import Context from "../../models/Context";
import { MemoryType, NON_FLOATING_NUMBERS, NUMBER_TYPES, UNSIGNED_NUMBERS } from "../../models/Memory";
import { Opcode, OpcodeLine } from "../../models/Opcode";
import { getMemory, setMemory } from "../../services/MemoryService";
import { validateNumberRange } from "../../services/TypeService";

const andOpcode: Opcode = {
    gas: 3,
    execute: async (line: OpcodeLine, context: Context) => {
        const memoryTarget = line[1] as string;
        const memoryLocationA = line[2] as string;
        const memoryLocationB = line[3] as string;
        const storeType = line[4] as MemoryType;

        const numA = getMemory(memoryLocationA, context, NON_FLOATING_NUMBERS as MemoryType[]);
        const numB = getMemory(memoryLocationB, context, NON_FLOATING_NUMBERS as MemoryType[]);
        const result = new BN(numA.value).and(new BN(numB.value));

        validateNumberRange(result.toString(), storeType);

        setMemory(context, memoryTarget, {
            type: storeType,
            value: result.toString(),
        });
    }
}

export default andOpcode;