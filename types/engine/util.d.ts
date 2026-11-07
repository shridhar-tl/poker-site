export declare function isoOf(date: Date): string;
export declare function randomHex(size: number): string;
export declare function randomRoomId(): string;
export declare function sanitizeText(value: string): string;
export declare function requireText(value: unknown, field: string, options?: {
    min?: number;
    max?: number;
}): string;
export declare function optionalText(value: unknown, field: string, options?: {
    max?: number;
}): string | undefined;
export declare function optionalHttpUrl(value: unknown, field: string): string | undefined;
export declare function requireRoomId(value: unknown): string;
export declare function payloadRecord(payload: unknown): Record<string, unknown>;
export declare function readString(source: Record<string, unknown>, key: string): string | null;
export declare function readBoolean(source: Record<string, unknown>, key: string): boolean | undefined;
export declare function readNumber(source: Record<string, unknown>, key: string): number | undefined;
export declare function readVoteValue(source: Record<string, unknown>, key: string): string | number | null;
