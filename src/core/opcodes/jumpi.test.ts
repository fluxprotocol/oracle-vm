import { executeCode } from "../../main";

describe('jumpi', () => {
    it('should jump if the condition is true', async () => {
        const executeResult = await executeCode([
            ['VAR', '$numA', '1', 'u128'],
            ['VAR', '$numB', '2', 'u128'],
            ['VAR', '$notLower', 'NOT_LOWER', 'string'],
            ['VAR', '$lower', 'LOWER', 'string'],
            ['LT', '$isLower', '$numA', '$numB'],
            ['VAR', '$dest', '9', 'u64'],
            ['JUMPI', '$dest', '$isLower'],
            ['VAR', '$dummy', 'dummy', 'string'],
            ['RETURN', '$notLower'],
            ['JUMPDEST'],
            ['RETURN', '$lower'],
        ]);

        expect(executeResult.code).toBe(0);
        expect(executeResult.context.memory.has('$dummy')).toBe(false);
        expect(executeResult.result).toBe('LOWER');
    });

    it('should not be able to jump to a non JUMPDEST', async () => {
        const executeResult = await executeCode([
            ['VAR', '$numA', '1', 'u128'],
            ['VAR', '$numB', '2', 'u128'],
            ['VAR', '$notLower', 'NOT_LOWER', 'string'],
            ['VAR', '$lower', 'LOWER', 'string'],
            ['LT', '$isLower', '$numA', '$numB'],
            ['VAR', '$dest', '2', 'u64'],
            ['JUMPI', '$dest', '$isLower'],
            ['VAR', '$dummy', 'dummy', 'string'],
            ['RETURN', '$notLower'],
            ['JUMPDEST'],
            ['RETURN', '$lower'],
        ]);

        expect(executeResult.code).toBe(1);
        expect(executeResult.message).toBe('Error: Cannot jump to a non JUMPDEST - @op:6:JUMPI');
    });
});