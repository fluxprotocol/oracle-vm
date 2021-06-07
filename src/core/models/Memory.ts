export type MemoryType = 'string' | 'double' | 'u8' | 'u16' | 'u32' | 'u64' | 'u128' | 'u256' | 'array' | 'json' | 'boolean';

export const UNSIGNED_NUMBERS = ['u8', 'u16', 'u32', 'u64', 'u128', 'u256'];
export const NUMBER_TYPES = ['double', ...UNSIGNED_NUMBERS];

export interface MemoryEntry {
    type: MemoryType;
    value: string;
}
