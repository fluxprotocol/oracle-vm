import { executeCode } from "../src/main";

describe('array', () => {
    it('should allow arrays to be created', async () => {
        const executeResult = await executeCode([
            ['VAR', '$arr', '["100", "200"]', 'array'],
            ['PARSE', '$res', '$arr', '1', 'string'],
            ['RETURN', '$res'],
        ]);

        expect(executeResult.result).toBe('200');
    });
});