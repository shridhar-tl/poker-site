export declare const maxIssuesPerBatch = 20;
export declare const bulkIssueLoadLimit = 100;
export declare function issueKeyOf(key: string): string;
export declare function newIssuesFor<T extends {
    key: string;
}>(existing: ReadonlyArray<{
    key: string;
}>, incoming: ReadonlyArray<T>): T[];
