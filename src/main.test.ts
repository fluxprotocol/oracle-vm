import { Code } from "./core/models/Code";
import { executeCode } from "./main";

describe("main", () => {
    describe('executeCode', () => {
        it('should execute a fetch and return it', async () => {
            const code: Code = [
                ["FETCH", "$apiData", "https://pokeapi.co/api/v2/pokemon/748/"],
                ["PARSE", "$baseExperience", "$apiData", "base_experience", "u128"],
                ["VAR", "$extraExperience", "1000", "u128"],
                ["ADD", "$result", "$baseExperience", "$extraExperience"],
                ["MUL", "$result", "$result", "$result"],
                ["RETURN", "$result"],
            ];

            const result = await executeCode(code, {
                debug: true,
            });

            console.log('[] result -> ', result.context);
        });
    });
});