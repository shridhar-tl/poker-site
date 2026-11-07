export type EngineErrorCode = 'VALIDATION_FAILED' | 'NOT_FOUND' | 'FORBIDDEN' | 'CONFLICT' | 'RATE_LIMITED' | 'UNSUPPORTED' | 'SERVER_ERROR';
export declare class EngineError extends Error {
    code: EngineErrorCode;
    status: number;
    constructor(code: EngineErrorCode, message: string);
}
export declare function validationError(message: string): EngineError;
export declare function notFoundError(message: string): EngineError;
export declare function forbiddenError(message: string): EngineError;
export declare function conflictError(message: string): EngineError;
export declare function unsupportedError(message: string): EngineError;
