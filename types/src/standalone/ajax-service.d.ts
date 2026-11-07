import type MessageService from '../services/message-service';
import type { PokerApiEndpoints } from './api-config';
export type ApiStatusFlag = 'VALIDATION_FAILED' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'CONFLICT' | 'RATE_LIMITED' | 'SERVER_ERROR' | 'NETWORK_ERROR' | string;
export declare class ApiError extends Error {
    statusFlag: ApiStatusFlag;
    httpStatus: number;
    body: Record<string, unknown> | null;
    constructor(statusFlag: ApiStatusFlag, httpStatus: number, message: string, body?: Record<string, unknown> | null);
}
export interface AjaxRequestOptions {
    auth?: boolean;
    token?: string;
    signal?: AbortSignal;
}
type TokenResolver = () => string | null;
export default class AjaxService {
    static dependencies: string[];
    private $message;
    private apiBaseUrl;
    private tokenResolver;
    constructor($message: MessageService, endpoints: PokerApiEndpoints);
    setTokenResolver(resolver: TokenResolver): void;
    get<T>(path: string, options?: AjaxRequestOptions): Promise<T>;
    post<T>(path: string, body?: unknown, options?: AjaxRequestOptions): Promise<T>;
    put<T>(path: string, body?: unknown, options?: AjaxRequestOptions): Promise<T>;
    delete<T>(path: string, body?: unknown, options?: AjaxRequestOptions): Promise<T>;
    private resolveToken;
    private request;
    notifyError(error: unknown, fallback?: string): void;
}
export {};
