import { MessageType, RequestMessage } from "../models/WorkerMessage";
import { isNodeJs } from "./EnvironmentService";
import { numberToHex } from "./HexService";

export function createWorker(url: URL, options?: any): Worker {
    let WorkerConstructor: any = null;

    if (isNodeJs()) {
        // @ts-ignore
        const workerThreads = __non_webpack_require__('worker_threads');
        WorkerConstructor = workerThreads.Worker;
    } else {
        WorkerConstructor = Worker;
    }

    return new WorkerConstructor(url, options);
}

export function selfPostMessage(message: RequestMessage) {
    if (isNodeJs()) {
        // @ts-ignore
        const workerThreads = __non_webpack_require__('worker_threads');
        workerThreads.parentPort.postMessage(message);
    } else {
        // @ts-ignore
        self.postMessage(message);
    }
}

export function workerAddEventListener(eventType: string, callback: (event: any) => void) {
    if (isNodeJs()) {
        // @ts-ignore
        const workerThreads = __non_webpack_require__('worker_threads');
        workerThreads.parentPort.on(eventType, callback);
    } else {
        self.addEventListener(eventType, callback);
    }
}

/**
 * Extracts the message data from a worker message
 * This is required due the differences between node and the browser
 *
 * @export
 * @param {*} event
 * @return {RequestMessage}
 */
export function extractMessageFromEvent(event: any): RequestMessage {
    try {
        if (isNodeJs()) {
            return event;
        }

        return event.data;
    } catch (error) {
        return event;
    }
}

export function storeAndNotify(sharedArrayBuffer: SharedArrayBuffer, index: number, value: number) {
    const int32a = new Int32Array(sharedArrayBuffer);

    Atomics.store(int32a, index, value);
    Atomics.notify(int32a, index);
}

export function waitAndLoad(sharedArrayBuffer: SharedArrayBuffer, index: number) {
    const int32a = new Int32Array(sharedArrayBuffer);

    Atomics.wait(new Int32Array(sharedArrayBuffer), index, 0);
    return Atomics.load(int32a, index);
}

export function resetSharedBuffer(sharedArrayBuffer: SharedArrayBuffer, index: number) {
    const int32a = new Int32Array(sharedArrayBuffer);
    Atomics.store(int32a, index, 0);
}

export function callMethodOnMainThread(notifierBuffer: SharedArrayBuffer, method: string, value: any[]): Buffer | undefined {
    selfPostMessage({
        type: MessageType.MethodCall,
        value: {
            methodName: method,
            args: value,
        },
    });

    // Freezes this thread and waits for the main thread to write to it
    waitAndLoad(notifierBuffer, 0);
    resetSharedBuffer(notifierBuffer, 0);

    // The main thread only writes the length of the result inside the notifierbuffer
    // We create a big enough shared buffer so the main thread can write the full result
    const writtenToBuffer = Buffer.from(notifierBuffer).slice(0); // slice 1 of since that is our notify index
    const bufferLength = parseInt(writtenToBuffer.toString('hex'), 16);

    if (bufferLength === 0) {
        return undefined;
    }

    const valueBuffer = new SharedArrayBuffer(bufferLength);

    selfPostMessage({
        type: MessageType.MethodCall,
        value: {
            methodName: 'writeResultToBuffer',
            args: [valueBuffer],
        },
    });

    waitAndLoad(notifierBuffer, 0);
    resetSharedBuffer(notifierBuffer, 0);

    return Buffer.from(valueBuffer);
}

export function sendBufferLengthToWorker(notifierBuffer: SharedArrayBuffer, value?: Buffer) {
    const lengthInHex = numberToHex(value?.length ?? 0, (notifierBuffer.byteLength * 2));
    const u8NotifierBuffer = new Uint8Array(notifierBuffer);
    u8NotifierBuffer.set(Buffer.from(lengthInHex, 'hex'), 0);

    storeAndNotify(notifierBuffer, 0, 1);
}