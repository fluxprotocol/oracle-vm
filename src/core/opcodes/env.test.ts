import { executeCode } from "../../main";
import Context from "../models/Context";

describe('env', () => {
    it('should be able to get the args and be able to parse them', async () => {
        const context = new Context(['not_me', 'yes_me']);

        const executeResult = await executeCode([
            ['ENV', '$args', 'args'],
            ['PARSE', '$secondArg', '$args', '1', 'string'],
            ['RETURN', '$secondArg'],
        ], {
            context,
        });

        expect(executeResult.result).toBe('yes_me');
    });

    it('should be able to get the gasUsed', async () => {
        const context = new Context(['not_me', 'yes_me']);

        const executeResult = await executeCode([
            ['VAR', '$a', '1', 'u8'],
            ['VAR', '$b', '2', 'u8'],
            ['ADD', '$c', '$a', '$b', 'u8'],
            ['ENV', '$gas', 'gasUsed'],
            ['RETURN', '$gas'],
        ], {
            context,
        });

        expect(executeResult.result).toBe('7');
    });

    it('should error when the environment variable does not exist', async () => {
        const context = new Context(['not_me', 'yes_me']);

        const executeResult = await executeCode([
            ['ENV', '$args', 'doesNotExist'],
            ['PARSE', '$secondArg', '$args', '1', 'string'],
            ['RETURN', '$secondArg'],
        ], {
            context,
        });

        expect(executeResult.code).toBe(1);
        expect(executeResult.message.includes('doesNotExist is not available as env'))
    });
});