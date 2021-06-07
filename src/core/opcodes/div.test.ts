import { executeCode } from "../../main";

describe('div', () => {
    it('should divide two u128 numbers', async () => {
        const executeResult = await executeCode([
            ['VAR', '$a', '5', 'u128'],
            ['VAR', '$b', '3', 'u128'],
            ['DIV', '$c', '$a', '$b', 'u128'],
            ['RETURN', '$c'],
        ]);

        const result = executeResult.context.memory.get('$c');

        expect(result?.type).toBe('u128');
        expect(result?.value).toBe('1');
    });

    it('should divide two u128 numbers and return a double', async () => {
        const executeResult = await executeCode([
            ['VAR', '$a', '5', 'u128'],
            ['VAR', '$b', '3', 'u128'],
            ['DIV', '$c', '$a', '$b', 'double'],
            ['RETURN', '$c'],
        ]);

        const result = executeResult.context.memory.get('$c');

        expect(result?.type).toBe('double');
        expect(result?.value).toBe('1.66666666666666666667');
    });
})