import { executeCode } from "../../main";

describe('jump', () => {
    it('should jump to a jump destination and skip over other RETURNs', async () => {
        const executeResult = await executeCode([
            ['VAR', '$destination', '5', 'u8'],
            ['VAR', '$fail', 'FAIL', 'string'],
            ['VAR', '$success', 'SUCCESS', 'string'],
            ['JUMP', '$destination'],
            ['RETURN', '$fail'],
            ['JUMPDEST'],
            ['RETURN', '$success'],
        ]);

        expect(executeResult.code).toBe(0);
        expect(executeResult.result).toBe('SUCCESS');
    });
});