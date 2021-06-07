import { Code } from "./core/models/Code";
import Context from "./core/models/Context";
import { executeCode } from "./main";

describe("main", () => {
    describe('executeCode', () => {
        it('should execute a fetch and return it', async () => {
            const code: Code = [
                ["VAR", '$url', "https://pokeapi.co/api/v2/pokemon/748/", 'string'],
                ["VAR", "$extraExperience", "1000", "u128"],

                ["FETCH", "$apiData", "$url"],
                ["PARSE", "$baseExperience", "$apiData", "base_experience", "u128"],

                ["ADD", "$result", "$baseExperience", "$extraExperience", "u32"],
                ["MUL", "$result", "$result", "$result", "u32"],

                ["RETURN", "$result"],
            ];

            const result = await executeCode(code, {
                debug: false,
            });

            expect(result.result).toBe('1375929');
        });

        it('should throw a gas limit error when the gas limit has been exceeded', async () => {
            const addOpcode = ['ADD', '$c', '$a', '$a', 'u32'];
            const context = new Context();
            context.gasLimit = 100;

            const executeResult = await executeCode([
                ['VAR', '$a', '1', 'u32'],
                ...new Array(50).fill(addOpcode),
            ], { context });

            expect(executeResult.code).toBe(1);
            expect(executeResult.message.includes('Gas limit exceeded 101/100')).toBe(true);
        });
    });
});