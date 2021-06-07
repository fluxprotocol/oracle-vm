import Big from "big.js";
import { MemoryType, UNSIGNED_NUMBERS } from "../models/Memory";
import assert from "../utils/assertUtils";
import { safeParseJson } from "../utils/jsonUtils";
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

    if (expectedType === 'array') {
        const parsedArray = safeParseJson(value);
        assert(Array.isArray(parsedArray), 'Failed to parse array');
    }

    if (expectedType === 'json') {
        const parsedJson = safeParseJson(value);
        assert(parsedJson !== null, 'Failed to parse JSON');
    }
}

/**
 * Validates a number type and checks if it's in range for the chosen type
 * This is required in JavaScript (and other non typed languages) since there is no concept of number types
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

    // Check for unsigned underflows
    if (UNSIGNED_NUMBERS.includes(type) && number.lt(0)) {
        throw new RangeError(`${type} underflow ${number.toString()}`);
    }

    // Check ranges for signed numbers
    if (type === 'i8') {
        if (number.gt('127')) {
            throw new RangeError(`${type} overflow ${number.toString()}`);
        } else if (number.lt('-128')) {
            throw new RangeError(`${type} underflow ${number.toString()}`);
        }
    } else if (type === 'i16') {
        if (number.gt('32767')) {
            throw new RangeError(`${type} overflow ${number.toString()}`);
        } else if (number.lt('-32768')) {
            throw new RangeError(`${type} underflow ${number.toString()}`);
        }
    } else if (type === 'i32') {
        if (number.gt('2147483647')) {
            throw new RangeError(`${type} overflow ${number.toString()}`);
        } else if (number.lt('-2147483648')) {
            throw new RangeError(`${type} underflow ${number.toString()}`);
        }
    } else if (type === 'i64') {
        if (number.gt('9223372036854775807')) {
            throw new RangeError(`${type} overflow ${number.toString()}`);
        } else if (number.lt('-9223372036854775808')) {
            throw new RangeError(`${type} underflow ${number.toString()}`);
        }
    } else if (type === 'i128') {
        if (number.gt('170141183460469231731687303715884105727')) {
            throw new RangeError(`${type} overflow ${number.toString()}`);
        } else if (number.lt('-170141183460469231731687303715884105728')) {
            throw new RangeError(`${type} underflow ${number.toString()}`);
        }
    } else if (type === 'i256') {
        if (number.gt('57896044618658097711785492504343953926634992332820282019728792003956564819967')) {
            throw new RangeError(`${type} overflow ${number.toString()}`);
        } else if (number.lt('-57896044618658097711785492504343953926634992332820282019728792003956564819968')) {
            throw new RangeError(`${type} underflow ${number.toString()}`);
        }
    }

    // Check ranges for unsigned numbers
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