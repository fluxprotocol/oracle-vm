import at from 'lodash.at';

import Context from "../models/Context";
import { NON_JSON_TYPES } from '../models/Memory';
import { Opcode, OpcodeLine } from "../models/Opcode";
import { getMemory } from "../services/MemoryService";

const findOpcode: Opcode = {
    gas: 10,
    execute: async (line: OpcodeLine, context: Context) => {
        const memoryTarget = line[1] as string;
        const fromLocation = line[2] as string;
        const querys = line[3] as string[][];
        let haystack: object[] = JSON.parse(getMemory(fromLocation, context, ['array']).value);

        context.useGas(querys.length * 2);

        querys.forEach((query) => {
            const path = query[0] as string;
            const comparison = query[1] as string;
            const comparisonVariableLocation = query[2] as string;
            const comparisonVariable = getMemory(comparisonVariableLocation, context, NON_JSON_TYPES);

            haystack = haystack.filter((item) => {
                const value = at<any>(item, [path])[0];

                if (comparison === '==') {
                    // Also not tested
                    return comparisonVariable.value === value;
                } else if (comparison === '>') {
                    // Not tested
                }
            });
        });

        console.log('[] fromValue -> ', haystack);


    },
};

export default findOpcode;