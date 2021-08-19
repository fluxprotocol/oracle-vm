export default interface ICache {
    set(id: string, binary: Uint8Array): Promise<void>;
    get(id: string): Promise<Uint8Array | undefined>;
    delete(id: string): Promise<void>;
    clear(): Promise<void>;
}