import Context from "../models/Context";
import { Opcode, OpcodeLine } from "../models/Opcode";

/**
 * A jump destination. Does nothing by itself.
 */
const jumpdestOpcode: Opcode = {
    gas: 1,
    execute: async (line: OpcodeLine, context: Context) => {}
}

export default jumpdestOpcode;