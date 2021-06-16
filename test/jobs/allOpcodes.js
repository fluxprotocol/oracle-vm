const code = [
    /** 
     * FETCH - Fetches a resource on a specific endpoint
     * [0] - Where the result should be stored
     * [1] - The URL the oracle needs to fetch 
     */
    ["FETCH", "$a", "https://example.com/api/near"],
    
    /**
     * PARSE - Parses the json object and stores it
     * [0] - Where the result should be stored
     * [1] - Which object/array needs to be parsed
     * [2] - Path to the value
     * [3] - The expected value type
     * 
     * Supports the following types. Maybe we can support floats
     * but we may not allow math on it..
     * - u8
     * - u16
     * - u32
     * - u64
     * - u128
     * - u256
     * - string
     * - array
     * - object
     * - boolean
     */
    ["PARSE", "$b", "$a", "path.to.key", "u128"],

    /**
     * ADD - Adds two numbers together
     * [0] - Where the result should be stored
     * [1] - The left number
     * [2] - The right number
     */
    ["ADD", "$c", "$a", "2"],

    /**
     * DIV - Divides two numbers
     * [0] - Where the result should be stored
     * [1] - The left number
     * [2] - The right number
     */
    ["DIV", "$c", "$a", "$c"],

    /**
     * MUL - Multiplies two numbers
     * [0] - Where the result should be stored
     * [1] - The left number
     * [2] - The right number
     */
    ["MUL", "$c", "$a", "$c"],

    /**
     * SUB - Subtracts two numbers
     * [0] - Where the result should be stored
     * [1] - The left number
     * [2] - The right number
     */
    ["SUB", "$c", "$a", "$c"],

    /** 
     * VAR - Sets a variable
    */
    ["VAR", "$x", "10", "u32"],
    ["VAR", "$ajx", "Ajax", "string"],

    ["FIND", "$d", "$a", [
        ["$$value.team", "=", "$ajx"],
        ["$$value.score", ">", "$x"]
    ]],

    ["REPLACE", "$a", ""],

    /** 
     * RETURN - Finishes execution and returns the value
     * [0] - The value you want to return
     * 
     * The return can be constructed
     */
    ["RETURN", "{ \"weights\": [$c, $a] }"],

    ['JUMPDEST'],

    ['JUMP', '2']
]