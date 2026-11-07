export interface RevisionDecision {
    apply: boolean;
    resync: boolean;
    last: number;
}
export declare function decideRevision(last: number, revision: number | undefined): RevisionDecision;
