import { executeCode } from "../../../main";

describe('eq', () => {
    it('should set a true value when a == b', async () => {
        const executeResult = await executeCode([
            ['VAR', '$a', '1000', 'u128'],
            ['VAR', '$b', '1000', 'u128'],
            ['EQ', '$c', '$a', '$b', 'u128'],
            ['RETURN', '$c'],
        ]);

        const result = executeResult.result;
        expect(result).toBe('true');
    });

    it('should set a false value when a != b', async () => {
        const executeResult = await executeCode([
            ['VAR', '$a', '1000', 'u128'],
            ['VAR', '$b', '20000', 'u128'],
            ['EQ', '$c', '$a', '$b', 'u128'],
            ['RETURN', '$c'],
        ]);

        const result = executeResult.result;
        expect(result).toBe('false');
    });
});