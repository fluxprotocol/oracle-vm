import { executeCode } from "../../main";

describe('sub', () => {
    it('should be able to subtract two u32 variables', async () => {
        const executeResult = await executeCode([
            ['VAR', '$a', '100', 'u32'],
            ['VAR', '$b', '2', 'u32'],
            ['SUB', '$c', '$a', '$b', 'u32'],
            ['RETURN', '$c']
        ]);

        expect(executeResult.result).toBe('98');
    });

    it('should throw an error when the value underflows', async () => {
        const executeResult = await executeCode([
            ['VAR', '$a', '100', 'u32'],
            ['VAR', '$b', '150', 'u32'],
            ['SUB', '$c', '$a', '$b', 'u32'],
            ['RETURN', '$c']
        ]);

        expect(executeResult.code).toBe(1);
        expect(executeResult.message.includes('u32 underflow -50')).toBe(true);
    });
});