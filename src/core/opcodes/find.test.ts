import { executeCode } from "../../main";

describe('findOpcode', () => {
    it('should be able to find a value in an array', async () => {
        const arr = [
            {
                id: '1',
                value: 'test1',
            },
            {
                id: '2',
                value: 'test2',
            },
            {
                id: '3',
                value: 'test3'
            }
        ];

        const result = await executeCode([
            ['VAR', '$a', JSON.stringify(arr), 'array'],
            ['FIND', '$result', '$a', [
                ['id', '==', '1'],
            ]]
        ]);


        
    });
});