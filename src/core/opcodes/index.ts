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
};

export default opcodes;