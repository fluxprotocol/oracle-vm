const metering = require('wasm-metering');

export function prepareWasmBinary(binary: Uint8Array): Uint8Array {
    const meteredWasm = metering.meterWASM(binary, {
        meterType: 'i32',
    });

    return meteredWasm;
}