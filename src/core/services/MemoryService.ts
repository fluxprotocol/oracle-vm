import Context from "../models/Context";
import { MemoryEntry, MemoryType } from "../models/Memory";

export function isMemoryType(type: MemoryType) {
    const memoryTypes: MemoryType[] = ['array', 'boolean', 'json', 'string', 'u128', 'u16', 'u256', 'u32', 'u64', 'u8'];
    return memoryTypes.includes(type);
}

export function setMemory(context: Context, key: string, value: MemoryEntry) {
    context.memory.set(key, value);
}

export function getMemory(key: string, context: Context, expectedType: MemoryType[]): MemoryEntry {
    const value = context.memory.get(key);

    if (!value) {
        throw new Error(`Expected variable at ${key}`);
    }

    if (!expectedType.includes(value.type)) {
        throw new Error(`Expected ${expectedType} but found ${value?.type} at ${key}`);
    }

    return value;
}

/**
 * Injects variable into a string.
 * Mostly used for FETCH and RETURN ops
 * 
 * TODO: Create this
 *
 * @export
 * @param {string} target
 * @param {Context} context
 * @return {string}
 */
export function injectVariable(target: string, context: Context): string {
    return context.memory.get(target)?.value ?? '';
}