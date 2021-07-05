import { Context, executeCode } from "../src/main";

describe('oracle', () => {
    it('should be able to generate an answer used in staking', async () => {
        const executeResult = await executeCode([
            ['ENV', '$args', 'args'],
            ['PARSE', '$multiplier', '$args', '0', 'u128'],

            ['VAR', '$number', '100.23', 'double'],
            ['VAR', '$zero', '0', 'u128'],

            ['LT', '$isNegative', '$number', '$zero'],
            ['MUL', '$numberAnswer', '$number', '$multiplier', 'u128'],

            ['VAR', '$answer', '{ "negative": $isNegative, "value": "$numberAnswer", "multiplier": "$multiplier" }', 'string'],
            ['RETURN', '$answer'],
        ], {
            context: new Context(['1000']),
        });

        const result = JSON.parse(executeResult.result ?? '{}');

        expect(result.negative).toBe(false);
        expect(result.value).toBe('100230');
        expect(result.multiplier).toBe('1000');
    });

    it('should be able to generate a negative answer used in staking', async () => {
        const executeResult = await executeCode([
            ['ENV', '$args', 'args'],
            ['PARSE', '$multiplier', '$args', '0', 'u128'],

            ['VAR', '$number', '-100.23', 'double'],
            ['VAR', '$zero', '0', 'u128'],
            ['VAR', '$negOne', '-1', 'i8'],
            ['LT', '$isNegative', '$number', '$zero'],

            ['MUL', '$number', '$number', '$negOne', 'double'],
            ['MUL', '$numberAnswer', '$number', '$multiplier', 'u256'],

            ['VAR', '$answer', '{ "negative": $isNegative, "value": "$numberAnswer", "multiplier": "$multiplier" }', 'string'],
            ['RETURN', '$answer'],
        ], {
            context: new Context(['1000']),
            debug: true,
        });

        const result = JSON.parse(executeResult.result ?? '{}');

        expect(result.negative).toBe(true);
        expect(result.value).toBe('100230');
        expect(result.multiplier).toBe('1000');
    });
});