import { Opcode } from "../models/Opcode";
import fetchOpcode from "./fetch";

export interface OpcodeList {
    [key: string]: Opcode;
}

const opcodes: OpcodeList = {
    'FETCH': fetchOpcode,
};

export default opcodes;