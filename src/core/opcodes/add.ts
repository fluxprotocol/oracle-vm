import Big from "big.js";
import Context from "../models/Context";
import { MemoryType, NUMBER_TYPES, UNSIGNED_NUMBERS } from "../models/Memory";
import { Opcode, OpcodeLine } from "../models/Opcode";
import { getMemory, setMemory } from "../services/MemoryService";
import { validateNumberRange } from "../services/TypeService";

const addOpcode: Opcode = {
    gas: 3,
    execute: async (line: OpcodeLine, context: Context) => {
        const memoryTarget = line[1] as string;
        const memoryLocationA = line[2] as string;
        const memoryLocationB = line[3] as MemoryType;
        const storeType = line[4] as MemoryType;

        const numA = getMemory(memoryLocationA, context, NUMBER_TYPES as MemoryType[]);
        const numB = getMemory(memoryLocationB, context, NUMBER_TYPES as MemoryType[]);
        let result = new Big(numA.value).add(numB.value);

        if (UNSIGNED_NUMBERS.includes(storeType)) {
            result = result.round(undefined, 0);
        }

        validateNumberRange(result, storeType);

        setMemory(context, memoryTarget, {
            type: storeType,
            value: result.toString(),
        });
    }
}

export default addOpcode;