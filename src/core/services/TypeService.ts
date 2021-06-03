import { MemoryType } from "../models/Context";
import { isMemoryType } from './MemoryService';

export function isBigNum(value: string): boolean {
    return /^\d+$/.test(value);
}

export function validateType(value: any, expectedType: MemoryType) {
    if (!isMemoryType(expectedType)) {
        throw new Error(`Type ${expectedType} does not exist`);
    }

    // Value should be a big number but it isn't
    if (typeof value === 'string' && expectedType !== 'string' && !isBigNum(value)) {
        throw new Error("Expected big number but string contained non numerical data");
    }
}