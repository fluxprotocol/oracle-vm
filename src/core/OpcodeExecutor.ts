import Context from "./models/Context";
import { OpcodeLine } from "./models/Opcode";
import opcodes from './opcodes';

export async function executeOpcode(opcodeLine: OpcodeLine, context: Context) {
    const opcodeName = opcodeLine[0] as string;
    const opcodeMethod = opcodes[opcodeName];

    if (!opcodeMethod) {
        throw new Error(`Opcode "${opcodeName}" not available`);
    }

    // Make sure we are able to fire up the opcode
    context.useGas(opcodeMethod.gas);
    await opcodeMethod.execute(opcodeLine, context);
}