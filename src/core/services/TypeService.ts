import Big from "big.js";
import { MemoryType } from "../models/Memory";
import { isMemoryType } from './MemoryService';

export function isNum(value: string): boolean {
    return /^\d+$/.test(value);
}

export function validateType(value: string, expectedType: MemoryType) {
    if (!isMemoryType(expectedType)) {
        throw new TypeError(`Type ${expectedType} does not exist`);
    }

    if (isNum(value)) {
        validateNumberRange(new Big(value), expectedType);
    }
}

/**
 * Validates a number type and checks if it's in range for the chosen type
 * This is required in JavaScript (and others) since there is no concept of number types
 *
 * @export
 * @param {Big} number
 * @param {MemoryType} type
 */
export function validateNumberRange(number: Big, type: MemoryType) {
    const hasComma = number.toString().includes('.');

    if (type !== 'double' && hasComma) {
        throw new TypeError(`${type} cannot contain double values`);
    }

    if (type === 'u8' && number.gt('255')) {
        throw new RangeError(`u8 overflow ${number.toString()}`);
    } else if (type === 'u16' && number.gt('65535')) {
        throw new RangeError(`u16 overflow ${number.toString()}`);
    } else if (type === 'u32' && number.gt('4294967295')) {
        throw new RangeError(`u32 overflow ${number.toString()}`);
    } else if (type === 'u64' && number.gt('18446744073709551615')) {
        throw new RangeError(`u64 overflow ${number.toString()}`);
    } else if (type === 'u128' && number.gt('340282366920938463463374607431768211455')) {
        throw new RangeError(`u128 overflow ${number.toString()}`);
    } else if (type === 'u256' && number.gt('115792089237316195423570985008687907853269984665640564039457584007913129639935')) {
        throw new RangeError(`u256 overflow ${number.toString()}`);
    }
}