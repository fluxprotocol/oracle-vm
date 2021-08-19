import { VmContext, WorkerContext } from "./models/Context";
import { MessageType } from "./models/WorkerMessage";
import { executeWasm } from "./services/VirtualMachineService";
import { prepareWasmBinary } from "./services/WasmService";
import { extractMessageFromEvent, workerAddEventListener, selfPostMessage } from "./services/WorkerService";

workerAddEventListener('message', async (event: MessageEvent) => {
    const data = extractMessageFromEvent(event);

    if (data.type !== MessageType.Spawn) {
        return;
    }

    const workerContext: WorkerContext = {
        ...data.value.context,
    };

    if (!workerContext.isFromCache) {
        workerContext.binary = prepareWasmBinary(workerContext.binary);

        selfPostMessage({
            type: MessageType.Cache,
            value: {
                binary: workerContext.binary,
            },
        });
    }

    const vmContext = new VmContext(workerContext);
    const executeResult = await executeWasm(vmContext);
    
    selfPostMessage({
        type: MessageType.Exit,
        value: executeResult,
    });
});