import { Opcode } from "../models/Opcode";
import fetchOpcode from "./fetch";
import parseOpcode from './parse';
import returnOpcode from "./return";
import varOpcode from "./var";
import addOpcode from './add';
import subOpcode from "./sub";
import mulOpcode from "./mul";
import divOpcode from "./div";
import modOpcode from "./mod";
import envOpcode from "./env";
import findOpcode from "./find";
import ltOpcode from "./comparisons/lt";
import jumpdestOpcode from "./jumpdest";
import jumpiOpcode from "./jumpi";
import jumpOpcode from "./jump";
import gtOpcode from "./comparisons/gt";
import andOpcode from "./bitwise/and";

export interface OpcodeList {
    [key: string]: Opcode;
}

const opcodes: OpcodeList = {
    'FETCH': fetchOpcode,
    'PARSE': parseOpcode,
    'RETURN': returnOpcode,
    'VAR': varOpcode,
    'ADD': addOpcode,
    'SUB': subOpcode,
    'MUL': mulOpcode,
    'DIV': divOpcode,
    'MOD': modOpcode,
    'AND': andOpcode,
    'ENV': envOpcode,
    'FIND': findOpcode,
    'LT': ltOpcode,
    'GT': gtOpcode,
    'JUMPDEST': jumpdestOpcode,
    'JUMP': jumpOpcode,
    'JUMPI': jumpiOpcode,
};

export default opcodes;
