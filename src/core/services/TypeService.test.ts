import Big from "big.js";
import { MemoryType } from "../models/Memory";
import { validateNumberRange, validateType } from "./TypeService";

describe('TypeService', () => {
    describe('validateType', () => {
        it('should throw an error when the type is not a supported memory type', () => {
            const t = () => {
                validateType('28', 'test' as MemoryType);
            }

            expect(t).toThrow('Type test does not exist');
        });
    });

    describe('validateNumberRange', () => {
        it('should throw an error when value contains floating number while not having a double type', () => {
            const t = () => {
                validateNumberRange(new Big(12.3), 'u8');
            }

            expect(t).toThrow('u8 cannot contain double values');
        });
    });
});