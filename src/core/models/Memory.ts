export type MemoryType = 'string' | 'u8' | 'u16' | 'u32' | 'u64' | 'u128' | 'u256' | 'array' | 'json' | 'boolean';

export const NUMBER_TYPES = ['u8', 'u16', 'u32', 'u64', 'u128', 'u256'];

export interface MemoryEntry {
    type: MemoryType;
    value: string;
}
