import Context from "../models/Context";
import { injectVariable } from "./MemoryService";

describe('MemoryService', () => {
    describe('injectVariable', () => {
        it('should inject a variable when no template is given', () => {
            const context = new Context();
            context.memory.set('$c', {
                type: 'string',
                value: 'result',
            });

            const result = injectVariable('{ "test": "$c" }', context);

            expect(result).toBe('{ "test": "result" }');
        });
    });
});