import { Context, execute, InMemoryCache } from '../dist/Process';
import { readFileSync } from 'fs';

jest.setTimeout(10_000);

describe('Process', () => {
    const memoryCache = new InMemoryCache();

    it('should be able to run a wasm file', async () => {
        const wasm = readFileSync(__dirname + '/wasm/cowsay.wasm');
        const result = await execute({
            args: ['cowsay', 'blah'],
            binary: new Uint8Array(wasm),
            env: {},
            gasLimit: (300_000_000_000_000).toString(),
            randomSeed: '0x012',
            timestamp: 1,
        }, memoryCache);

        expect(result.gasUsed).toBe('26844206');
        expect(result.code).toBe(0);
    });

    it('should throw a gas error when the gas limit has been exceeded', async () => {
        const wasm = readFileSync(__dirname + '/wasm/cowsay.wasm');

        const result = await execute({
            args: ['cowsay', 'blah'],
            binary: new Uint8Array(wasm),
            env: {},
            gasLimit: (21_000_000).toString(),
            randomSeed: '0x012',
            timestamp: 1,
        }, memoryCache);

        expect(result.code).toBe(1);
        expect(result.logs[0]).toBe('ERR_OUT_OF_GAS');
        expect(result.gasUsed).toBe('21004832');
    });

    it('should execute the simple-call-url and get a string', async () => {
        const wasm = readFileSync(__dirname + '/wasm/basic-fetch.wasm');
        const result = await execute({
            args: [
                '0xdeadbeef',
                JSON.stringify([
                    {
                        end_point: 'https://pokeapi.co/api/v2/pokemon/ditto',
                        source_path: '$.abilities[1].ability.name',
                    }
                ]),
                'string'
            ],
            binary: new Uint8Array(wasm),
            env: {},
            gasLimit: (300_000_000_000_000).toString(),
            randomSeed: '0x012',
            timestamp: new Date().getTime(),
        }, memoryCache);

        const outcome = JSON.parse(result.logs[result.logs.length - 1]);
        expect(outcome.value).toBe('imposter');
    });

    it('should execute the simple-call-url and combine numbers with a small multiplier', async () => {
        const wasm = readFileSync(__dirname + '/wasm/basic-fetch.wasm');
        const result = await execute({
            args: [
                '0xdeadbeef',
                JSON.stringify([
                    {
                        end_point: 'https://pokeapi.co/api/v2/pokemon/ditto',
                        source_path: '$.weight',
                    },
                    {
                        end_point: 'https://pokeapi.co/api/v2/pokemon/ditto',
                        source_path: '$.base_experience',
                    }
                ]),
                'number',
                '1000',
            ],
            binary: new Uint8Array(wasm),
            env: {},
            gasLimit: (300_000_000_000_000).toString(),
            randomSeed: '0x012',
            timestamp: new Date().getTime(),
        }, memoryCache);

        const outcome = JSON.parse(result.logs[result.logs.length - 1]);

        expect(result.gasUsed).toBe('633190654');
        expect(outcome.value).toBe('70500');
    });

    it('should execute the simple-call-url and combine numbers with a small multiplier and round the number', async () => {
        const wasm = readFileSync(__dirname + '/wasm/basic-fetch.wasm');
        const result = await execute({
            args: [
                '0xdeadbeef',
                JSON.stringify([
                    {
                        end_point: 'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&startTime=1634718287000&endTime=1634719287000&limit=1',
                        source_path: '$[0][4]',
                    },
                ]),
                'number',
                '10',
            ],
            binary: new Uint8Array(wasm),
            env: {},
            gasLimit: (300_000_000_000_000).toString(),
            randomSeed: '0x012',
            timestamp: new Date().getTime(),
        }, memoryCache);

        const outcome = JSON.parse(result.logs[result.logs.length - 1]);

        expect(outcome.value).toBe('641802');
        expect(result.gasUsed).toBe('16853419');
    });

    it('should execute the simple-call-url and combine numbers with a big multiplier', async () => {
        const wasm = readFileSync(__dirname + '/wasm/basic-fetch.wasm');
        const result = await execute({
            args: [
                '0xdeadbeef',
                JSON.stringify([
                    {
                        end_point: 'https://pokeapi.co/api/v2/pokemon/ditto',
                        source_path: '$.weight',
                    },
                    {
                        end_point: 'https://pokeapi.co/api/v2/pokemon/ditto',
                        source_path: '$.base_experience',
                    }
                ]),
                'number',
                (10e24).toString(),
            ],
            binary: new Uint8Array(wasm),
            env: {},
            gasLimit: (300_000_000_000_000).toString(),
            randomSeed: '0x012',
            timestamp: new Date().getTime(),
        }, memoryCache);

        const outcome = JSON.parse(result.logs[result.logs.length - 1]);

        expect(result.gasUsed).toBe('632902012');
        expect(outcome.value).toBe('705000000000000000000000000');
    });

    it('should execute the simple-call-url and combine numbers using price feeds', async () => {
        const wasm = readFileSync(__dirname + '/wasm/basic-fetch.wasm');
        const result = await execute({
            args: [
                '0xdeadbeef',
                JSON.stringify([
                    {
                        end_point: 'https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/historical?start=1630612481&end=1630612781',
                        source_path: '$[0].close',
                    },
                ]),
                'number',
                (10e24).toString(),
            ],
            binary: new Uint8Array(wasm),
            env: {},
            gasLimit: (300_000_000_000_000).toString(),
            randomSeed: '0x012',
            timestamp: new Date().getTime(),
        }, memoryCache);

        const outcome = JSON.parse(result.logs[result.logs.length - 1]);
        expect(result.gasUsed).toBe('23223018');
        expect(outcome.value).toBe('493625367592069900000000000000');
    });

    it('should always use cache when available', async () => {
        const internalMemoryCache = new InMemoryCache();
        const wasm = readFileSync(__dirname + '/wasm/basic-fetch.wasm');
        const setSpy = jest.spyOn(internalMemoryCache, 'set');
        const getSpy = jest.spyOn(internalMemoryCache, 'get');

        const context: Context = {
            args: [
                '0xdeadbeef',
                JSON.stringify([
                    {
                        end_point: 'https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/historical?start=1630612481&end=1630612781',
                        source_path: '$[0].close',
                    },
                ]),
                'number',
                (10e24).toString(),
            ],
            binary: new Uint8Array(wasm),
            env: {},
            gasLimit: (300_000_000_000_000).toString(),
            randomSeed: '0x012',
            timestamp: new Date().getTime()
        };

        await execute(context, internalMemoryCache);
        await execute(context, internalMemoryCache);

        expect(getSpy).toHaveBeenCalledTimes(2);
        expect(setSpy).toHaveBeenCalledTimes(1);
    });
});