import { executeCode } from "../src/main";

describe('priceFeed', () => {
    it('should get an average of the prices on multiple sources', async () => {
        const executeResult = await executeCode([
            ['VAR', '$priceA', '2.65142611557127057344', 'double'],
            ['VAR', '$priceB', '2.78', 'double'],
            ['VAR', '$decimals', '100000000000000000000', 'u128'],
            ['VAR', '$totalPriceFeeds', '2', 'u8'],
            ['MUL', '$noramlizedPriceA', '$priceA', '$decimals', 'u128'],
            ['MUL', '$normalizedPriceB', '$priceB', '$decimals', 'u128'],
            ['ADD', '$addedPrices', '$noramlizedPriceA', '$normalizedPriceB', 'u128'],
            ['DIV', '$price', '$addedPrices', '$totalPriceFeeds', 'u128'],
            ['RETURN', '$price'],
        ]);

        expect(executeResult.result).toBe('271571305778563528672');
    });
});