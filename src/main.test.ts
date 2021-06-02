import { Code } from "./core/models/Code";
import { executeCode } from "./main";

describe("main", () => {
    describe('executeCode', () => {
        it('should execute a fetch and return it', async () => {
            const code: Code = [
                ["FETCH", "$a", "https://pokeapi.co/api/v2/pokemon/748/"],
                ["PARSE", "$b", "$a", "abilities[0].ability.name", "string"],
            ];

            const result = await executeCode(code);

            console.log('[] result -> ', result);
        });
    });
});