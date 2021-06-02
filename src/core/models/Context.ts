export interface MemoryEntry {
    type: 'string' | 'u8' | 'u16' | 'u32' | 'u64' | 'u128' | 'u256' | 'array' | 'json' | 'boolean'
    value: string;
}

class Context {
    memory: Map<string, MemoryEntry> = new Map();
    gasUsed: number = 0;
    gasLimit: number = 100000;
    result?: string;
}

export default Context;