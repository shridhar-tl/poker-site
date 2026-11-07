export declare const pendingKeys: {
    readonly vote: 'vote';
    readonly round: 'round';
    readonly settings: 'settings';
    readonly avatar: 'avatar';
    readonly invite: 'invite';
    readonly leave: 'leave';
    readonly host: 'host';
    readonly issue: (issueId: string) => string;
    readonly member: (sid: string) => string;
    readonly joinRequest: (requestId: string) => string;
    readonly invitation: (userId: string) => string;
    readonly estimate: (issueId: string) => string;
};
export declare function usePending(key: string): boolean;
