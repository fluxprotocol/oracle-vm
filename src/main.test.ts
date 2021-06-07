import { Code } from "./core/models/Code";
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
    });
});