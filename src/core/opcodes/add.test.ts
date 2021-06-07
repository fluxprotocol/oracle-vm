import { executeCode } from "../../main";

describe('add', () => {
    it('should add two u128 numbers together', async () => {
        const executeResult = await executeCode([
            ['VAR', '$a', '1000', 'u128'],
            ['VAR', '$b', '20', 'u128'],
            ['ADD', '$c', '$a', '$b', 'u128'],
        ]);

        const result = executeResult.context.memory.get('$c');

        expect(result?.type).toBe('u128');
        expect(result?.value).toBe('1020');
    });

    it('should throw an overflow error when a number exceeds the type', async () => {
        const executeResult = await executeCode([
            ['VAR', '$a', '255', 'u8'],
            ['VAR', '$b', '2', 'u8'],
            ['ADD', '$c', '$a', '$b', 'u8'],
        ]);

        expect(executeResult.code).toBe(1);
        expect(executeResult.message.includes('u8 overflow 257')).toBe(true);
    });

    it('should round down when two doubles are added', async () => {
        const executeResult = await executeCode([
            ['VAR', '$a', '1.0', 'double'],
            ['VAR', '$b', '1.9', 'double'],
            ['ADD', '$c', '$a', '$b', 'u8'],
            ['RETURN', '$c'],
        ]);

        expect(executeResult.result).toBe('2');
    });
})