import { executeCode } from "../../main";
import Context from "../models/Context";

describe('parse', () => {
    it('should be able to parse data from a JSON string', async () => {
        const executeResult = await executeCode([
            ['ENV', '$args', 'args'],
            ['PARSE', '$json', '$args', '0', 'json'],

            ['PARSE', '$result', '$json', 'test[1]', 'string'],
            ['RETURN', '$result']
        ], {
            context: new Context([
                JSON.stringify({
                    test: ['bad', 'good'],
                }),
            ]),
        });

        expect(executeResult.result).toBe('good');
    });

    it('should be able to parse data from a JSON string with dynamic indexes', async () => {
        const executeResult = await executeCode([
            ['ENV', '$args', 'args'],
            ['PARSE', '$index', '$args', '0', 'json'],
            ['PARSE', '$json', '$args', '1', 'json'],

            ['PARSE', '$result', '$json', 'test[$index]', 'string'],
            ['RETURN', '$result']
        ], {
            context: new Context([
                '2',
                JSON.stringify({
                    test: ['bad', 'good', 'meh'],
                }),
            ]),
        });

        expect(executeResult.result).toBe('meh');
    });
});