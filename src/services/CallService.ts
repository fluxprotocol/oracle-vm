import fetch from 'node-fetch';
import { parseJson } from "./JsonService";

export interface HttpCallParams {
    url?: string | null;
    options?: {
        headers?: {
            [key: string]: string | null
        },
        method?: string | null,
        body?: string | null,
    },
    type?: 'http' | null
}

export type CallParams = HttpCallParams;

export interface CallResult {
    status: number;
    result: string;
    error: boolean;
}

function createCallResultError(reason: string, status = 1): CallResult {
    return {
        error: true,
        result: reason,
        status,
    }
}

async function httpCall(callParams: HttpCallParams): Promise<CallResult> {
    try {
        if (!callParams.url) throw new Error('ERR_NO_URL');

        let headers: { [key: string]: string } = {};

        // Validating headers
        if (callParams.options?.headers) {
            if (typeof callParams.options.headers !== 'object') throw new Error('ERR_HEADERS_NON_OBJECT');

            Object.keys(callParams.options.headers).forEach((headerKey) => {
                if (typeof headerKey !== 'string') throw new Error('ERR_HEADERS_KEY_NON_STRING');
                if (!callParams.options?.headers) throw new Error('ERR_HEADERS_NON_OBJECT');
                if (!callParams.options.headers[headerKey]) throw new Error('ERR_HEADER_VALUE_NULL');
                if (typeof callParams.options?.headers[headerKey] !== 'string') throw new Error('ERR_HEADER_VALUE_NON_STRING');
            
                headers[headerKey] = callParams.options.headers[headerKey] ?? '';
            });
        }

        // Validating body
        if (callParams.options?.body) {
            if (typeof callParams.options.body !== 'string') throw new Error('ERR_BODY_NON_STRING');
        }
    
        const response = await fetch(callParams.url, {
            method: callParams.options?.method ?? 'GET',
            headers,
            body: callParams.options?.body ?? undefined,
        });

        return {
            error: !response.ok,
            result: await response.text(),
            status: response.status,
        }
    } catch(error: any) {
        return {
            error: true,
            result: error ? error.toString() : 'ERR_UNKNOWN',
            status: 1,
        }
    }
}

export async function call(stringifiedParams?: string): Promise<CallResult> {
    if (!stringifiedParams) {
        return createCallResultError('ERR_NO_PARAMS');
    }

    const params = parseJson<CallParams>(stringifiedParams);
    if (params === null) return createCallResultError('ERR_NULL_PARAMS');

    if (params.type !== 'http') {
        return createCallResultError('ERR_NON_SUPPORTED_CALL');
    }

    return httpCall(params);
}