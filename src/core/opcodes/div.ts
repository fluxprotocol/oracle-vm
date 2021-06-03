import Big from "big.js";
import Context from "../models/Context";
import { MemoryType, NUMBER_TYPES } from "../models/Memory";
import { Opcode, OpcodeLine } from "../models/Opcode";
import { getMemory, setMemory } from "../services/MemoryService";
import { validateNumberRange } from "../services/TypeService";

const divOpcode: Opcode = {
    gas: 5,
    execute: async (line: OpcodeLine, context: Context) => {
        const memoryTarget = line[1] as string;
        const memoryLocationA = line[2] as string;
        const memoryLocationB = line[3] as MemoryType;

        const numA = getMemory(memoryLocationA, context, NUMBER_TYPES as MemoryType[]);
        const numB = getMemory(memoryLocationB, context, NUMBER_TYPES as MemoryType[]);

        if (numA.type !== numB.type) {
            throw new TypeError(`left type ${numA.type} did not match right type ${numB.type}`);
        }

        const result = new Big(numA.value).div(numB.value);
        validateNumberRange(result, numA.type);

        setMemory(context, memoryTarget, {
            type: numA.type,
            value: result.toString(),
        });
    }
}

export default divOpcode;