import Big from "big.js";
import Context from "../../models/Context";
import { MemoryType, NUMBER_TYPES } from "../../models/Memory";
import { Opcode, OpcodeLine } from "../../models/Opcode";
import { getMemory, setMemory } from "../../services/MemoryService";

const ltOpcode: Opcode = {
    gas: 3,
    execute: async (line: OpcodeLine, context: Context) => {
        const memoryTarget = line[1] as string;
        const memoryLocationA = line[2] as string;
        const memoryLocationB = line[3] as MemoryType;

        const numA = getMemory(memoryLocationA, context, NUMBER_TYPES as MemoryType[]);
        const numB = getMemory(memoryLocationB, context, NUMBER_TYPES as MemoryType[]);
        const result = new Big(numA.value).lt(numB.value);

        setMemory(context, memoryTarget, {
            type: 'boolean',
            value: result.toString(),
        });
    }
}

export default ltOpcode;