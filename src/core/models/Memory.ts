export type MemoryType = 'string' | 'double' | 'i8' | 'u8' | 'i16' | 'u16' | 'i32' | 'u32' | 'i64' | 'u64' | 'i128' | 'u128' | 'i256' | 'u256' | 'array' | 'json' | 'boolean';

export const SIGNED_NUMBERS: MemoryType[] = ['i8', 'i16', 'i32', 'i64', 'i128', 'i256'];
export const UNSIGNED_NUMBERS: MemoryType[] = ['u8', 'u16', 'u32', 'u64', 'u128', 'u256'];
export const NON_FLOATING_NUMBERS: MemoryType[] = [...UNSIGNED_NUMBERS, ...SIGNED_NUMBERS];
export const NUMBER_TYPES: MemoryType[] = ['double', ...NON_FLOATING_NUMBERS];
export const NON_JSON_TYPES: MemoryType[] = [...NUMBER_TYPES, 'string', 'boolean'];

export interface MemoryEntry {
    type: MemoryType;
    value: string;
}
