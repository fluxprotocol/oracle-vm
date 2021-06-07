import { executeCode } from "../../main";

describe('var', () => {
    it('should be able to set the variable to a number in bounds', async () => {
        const result = await executeCode([
            ['VAR', '$a', '100', 'u8'],
        ]);

        const entry = result.context.memory.get('$a')

        expect(entry?.value).toBe('100');
        expect(entry?.type).toBe('u8');
    });

    it('should throw an error when the number exceeds the bounds of the type u8', async () => {
        const result = await executeCode([
            ['VAR', '$a', '256', 'u8'],
        ]);

        expect(result.context.memory.has('$a')).toBe(false);
        expect(result.code).toBe(1);
        expect(result.message.includes('u8 overflow 256')).toBe(true);
    });

    it('should inject a variable and set it to a new location', async () => {
        const result = await executeCode([
            ['VAR', '$a', '256', 'u32'],
            ['VAR', '$b', '$a', 'u32'],
        ]);

        const entryA = result.context.memory.get('$a');
        const entryB = result.context.memory.get('$b');

        expect(entryA?.value).toBe('256');
        expect(entryA?.type).toBe('u32');

        expect(entryB?.value).toBe('256');
        expect(entryB?.type).toBe('u32');
    });

    it('should not be able to inject a variable when the type is too small', async () => {
        const result = await executeCode([
            ['VAR', '$a', '256', 'u32'],
            ['VAR', '$b', '$a', 'u8'],
        ]);

        expect(result.context.memory.has('$a')).toBe(true);
        expect(result.context.memory.has('$b')).toBe(false);
        expect(result.code).toBe(1);
        expect(result.message.includes('u8 overflow 256')).toBe(true);
    });

    it('should be able to construct a string with multiple variables', async () => {
        const result = await executeCode([
            ['VAR', '$a', 'hello', 'string'],
            ['VAR', '$b', 'world', 'string'],
            ['VAR', '$c', '$a $b', 'string'],
        ]);

        const entryA = result.context.memory.get('$a');
        const entryB = result.context.memory.get('$b');
        const entryC = result.context.memory.get('$c');

        expect(entryA?.value).toBe('hello');
        expect(entryA?.type).toBe('string');

        expect(entryB?.value).toBe('world');
        expect(entryB?.type).toBe('string');

        expect(entryC?.value).toBe('hello world');
        expect(entryC?.type).toBe('string');
    });

    it('should be able to overwrite variables but remember the previous value while injecting', async () => {
        const result = await executeCode([
            ['VAR', '$a', 'hello', 'string'],
            ['VAR', '$a', '$a world', 'string'],
        ]);

        const entryA = result.context.memory.get('$a');

        expect(entryA?.value).toBe('hello world');
        expect(entryA?.type).toBe('string');
    });

    it('should be able to create a URL', async () => {
        const result = await executeCode([
            ['VAR', '$a', '891', 'string'],
            ['VAR', '$url', 'https://example.com/api/$a/name', 'string'],
        ]);

        const entryA = result.context.memory.get('$url');

        expect(entryA?.value).toBe('https://example.com/api/891/name');
        expect(entryA?.type).toBe('string');
    });
});