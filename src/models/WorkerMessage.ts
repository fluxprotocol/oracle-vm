import { WorkerContext } from "./Context";
import { ExecuteResult } from "./ExecuteResult";

export enum MessageType {
    Event = 'EVENT',
    Spawn = 'SPAWN',
    Cache = 'CACHE',
    Provider = 'PROVIDER',
    Message = 'MESSAGE',
    MethodCall = 'METHOD_CALL',
    Exit = 'EXIT',
}

export interface RequestMessageBase {
    type: MessageType,
    value: any,
}

export interface SpawnMessage extends RequestMessageBase {
    type: MessageType.Spawn,
    value: {
        context: WorkerContext,
    },
}

export interface ExitMessage extends RequestMessageBase {
    type: MessageType.Exit;
    value: ExecuteResult;
}

export interface MethodCallMessage extends RequestMessageBase {
    type: MessageType.MethodCall;
    value: {
        methodName: string;
        args: any[];
    };
}

export interface CacheMessage extends RequestMessageBase {
    type: MessageType.Cache,
    value: {
        binary: Uint8Array;
    }
}

export type RequestMessage = SpawnMessage | ExitMessage | MethodCallMessage | CacheMessage;


