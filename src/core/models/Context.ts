import { MemoryEntry } from "./Memory";

class Context {
    memory: Map<string, MemoryEntry> = new Map();
    gasUsed: number = 0;
    gasLimit: number = 1000;
    result?: string;

    clone(): Context {
        const context = new Context();

        context.memory = new Map(this.memory);
        context.gasUsed = this.gasUsed;
        context.gasLimit = this.gasLimit;
        context.result = this.result;
        
        return context;
    }
}

export default Context;