import { MemoryEntry } from "./Memory";

class Context {
    memory: Map<string, MemoryEntry> = new Map();
    gasUsed: number = 0;
    programCounter: number = 0;
    gasLimit: number = 1000;
    result?: string;
    args: string[];

    constructor(args: string[] = []) {
        this.args = args;
    }

    clone(): Context {
        const context = new Context(this.args);

        context.memory = new Map(this.memory);
        context.gasUsed = this.gasUsed;
        context.programCounter = this.programCounter;
        context.gasLimit = this.gasLimit;
        context.result = this.result;
        context.args = context.args;

        return context;
    }

    useGas(gas: number) {
        this.gasUsed += gas;

        if (this.gasUsed > this.gasLimit) {
            throw new Error(`Gas limit exceeded ${this.gasUsed}/${this.gasLimit}`);
        }
    }

    getEnvVariable(key: string): MemoryEntry {
        switch(key) {
            case 'gasLimit':
                return {
                    type: 'u32',
                    value: this.gasUsed.toString(),
                }
            case 'gasUsed':
                return {
                    type: 'u32',
                    value: this.gasUsed.toString(),
                };
            case 'args':
                return {
                    type: 'array',
                    value: JSON.stringify(this.args),
                }
        }

        throw new ReferenceError(`${key} is not available as environment variable`);
    }
}

export default Context;