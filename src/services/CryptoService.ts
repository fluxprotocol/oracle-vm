import keccak256 from 'keccak256';

/**
 * Generates a hashed buffer of a fixed size
 *
 * @export
 * @param {string} input
 * @param {number} size
 * @return {Buffer}
 */
export function generateFixedBuffer(input: string, size: number): Buffer {
    const buffer = new Uint8Array(size);
    const hash: Buffer = keccak256(input);

    if (hash.length >= size) {
        return hash.slice(0, size);
    }
    
    let offset = 0;

    while(offset < size) {
        const leftToFill = buffer.length - offset;
        
        if (leftToFill < hash.length) {
            buffer.set(hash.slice(0, leftToFill), offset);
        } else {
            buffer.set(hash, offset);
        }

        offset += hash.length;
    }

    return Buffer.from(buffer);
}