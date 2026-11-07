export interface PokerApiEndpoints {
    apiBaseUrl: string;
    wsBaseUrl: string;
}
export declare function normalizeEndpoints(endpoints: PokerApiEndpoints): PokerApiEndpoints;
