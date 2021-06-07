import Context from "../models/Context";
import { MemoryEntry, MemoryType, NUMBER_TYPES } from "../models/Memory";

export function isMemoryType(type: MemoryType) {
    const memoryTypes: MemoryType[] = ['array', 'boolean', 'json', 'string', ...NUMBER_TYPES];
    return memoryTypes.includes(type);
}

/**
 * Sets a variable in memory
 *
 * TODO: Before setting variable make sure the variable doesn't exist
 * and if it does make sure the types match.
 * 
 * @export
 * @param {Context} context
 * @param {string} key
 * @param {MemoryEntry} value
 */
export function setMemory(context: Context, key: string, value: MemoryEntry) {
    context.memory.set(key, value);
}

export function getMemory(key: string, context: Context, expectedType: MemoryType[]): MemoryEntry {
    const value = context.memory.get(key);

    if (!value) {
        throw new Error(`Expected variable at ${key}`);
    }

    if (expectedType.length) {
        if (!expectedType.includes(value.type)) {
            throw new Error(`Expected ${expectedType} but found ${value?.type} at ${key}`);
        }
    }

    return value;
}

/**
 * Injects variables into the target string.
 * When the variable could not be found in the memory, the key will be returned
 *
 * @export
 * @param {string} target
 * @param {Context} context
 * @return {string}
 */
export function injectVariable(target: string, context: Context): string {
    return target.replace(/\$(\w+)/gi, (key) => {
        const entry = context.memory.get(key);
        return entry?.value ?? key;
    });
}