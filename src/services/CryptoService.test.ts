import { generateFixedBuffer } from "./CryptoService";

describe('CryptoService', () => {
    describe('generateHashedBuffer', () => {
        it('should generate a buffer of a 16 byte length', () => {
            const buffer = generateFixedBuffer('test2', 16);
            expect(buffer).toStrictEqual(Buffer.from('4da432f1ecd4c0ac028ebde3a3f78510', 'hex'));
        });

        it('should generate a buffer of a 100 byte length', () => {
            const buffer = generateFixedBuffer('test2', 100);
            expect(buffer).toStrictEqual(Buffer.from('4da432f1ecd4c0ac028ebde3a3f78510a21d54087b161590a63080d33b702b8d4da432f1ecd4c0ac028ebde3a3f78510a21d54087b161590a63080d33b702b8d4da432f1ecd4c0ac028ebde3a3f78510a21d54087b161590a63080d33b702b8d4da432f1', 'hex'));
        });
    });
});