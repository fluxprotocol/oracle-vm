import ICache from './Cache';

export default class InMemoryCache implements ICache {
    private internalCache: Map<string, Uint8Array> = new Map();

    async set(id: string, binary: Uint8Array) {
        this.internalCache.set(id, binary);
    }

    async delete(id: string) {
        this.internalCache.delete(id);
    }

    async get(id: string) {
        return this.internalCache.get(id);
    }

    async clear() {
        this.internalCache.clear();
    }
}