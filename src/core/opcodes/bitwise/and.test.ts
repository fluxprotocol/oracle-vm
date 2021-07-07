import { executeCode } from "../../../main";

describe('and', () => {
    it('should return 0 when one value is 0', async () => {
        const executeResult = await executeCode([
            ['VAR', '$a', '0', 'u8'],
            ['VAR', '$b', '1', 'u8'],
            ['AND', '$c', '$a', '$b', 'u8'],
            ['RETURN', '$c'],
        ]);

        expect(executeResult.result).toBe('0');
    });

    it('should return 1 when both values are 1', async () => {
        const executeResult = await executeCode([
            ['VAR', '$a', '1', 'u8'],
            ['VAR', '$b', '1', 'u8'],
            ['AND', '$c', '$a', '$b', 'u8'],
            ['RETURN', '$c'],
        ]);

        expect(executeResult.result).toBe('1');
    });
});