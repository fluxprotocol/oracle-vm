import { executeCode } from "../../../main";

describe('or', () => {
    it('should return 1 when one value is 1', async () => {
        const executeResult = await executeCode([
            ['VAR', '$a', '0', 'u8'],
            ['VAR', '$b', '1', 'u8'],
            ['OR', '$c', '$a', '$b', 'u8'],
            ['RETURN', '$c'],
        ]);

        expect(executeResult.result).toBe('1');
    });

    it('should return 0 when both values are 0', async () => {
        const executeResult = await executeCode([
            ['VAR', '$a', '0', 'u8'],
            ['VAR', '$b', '0', 'u8'],
            ['AND', '$c', '$a', '$b', 'u8'],
            ['RETURN', '$c'],
        ]);

        expect(executeResult.result).toBe('0');
    });
});