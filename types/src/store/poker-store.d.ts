import type { MemberRole, PokerInvitation, PokerIssue, PokerJoinRequest, PokerMember, PokerRoom, PokerVote, ScoreType } from '../../shared/types/poker';
import type { ConnectionStatus, EstimateTarget } from '../contracts';
export interface PendingIssue {
    pendingId: string;
    key: string;
    summary?: string;
}
export interface PokerState {
    roomId: string;
    sid: string;
    role: MemberRole;
    room: PokerRoom | null;
    members: PokerMember[];
    membersMap: Record<string, PokerMember>;
    issuesMap: Record<string, PokerIssue>;
    votesMap: Record<string, PokerVote>;
    onlineIds: string[];
    offlineSince: Record<string, number>;
    serverOffsetMs: number;
    joinRequests: PokerJoinRequest[];
    invitations: PokerInvitation[];
    lastRevision: number;
    viewingIssueId: string | null;
    connectionStatus: ConnectionStatus;
    isLoaded: boolean;
    showIssuePanel: boolean;
    showJoinRequests: boolean;
    showInvitePanel: boolean;
    bulkJoinAction: 'approveAllJoin' | 'rejectAllJoin' | null;
    bulkDisableApproval: boolean;
    closedReason: string | null;
    pendingActions: Record<string, number>;
    pendingIssues: PendingIssue[];
    estimateTarget: EstimateTarget | null;
}
export declare const pokerStore: import("fluxo-ui/store").Store<PokerState>;
export declare const usePokerStore: {
    (): PokerState;
    <R>(selector: (state: PokerState) => R, equalityFn?: boolean | ((a: R, b: R) => boolean) | undefined): R;
};
export declare function setPokerState(partial: Partial<PokerState>): void;
export declare function resetPokerState(): void;
export declare function updatePokerState(updater: (state: PokerState) => Partial<PokerState>, afterApply?: (state: PokerState) => void): void;
export declare function markPending(key: string): void;
export declare function clearPending(key: string): void;
export declare function isPending(state: PokerState, key: string): boolean;
export declare function mapById<T extends {
    id: string;
}>(items: T[]): Record<string, T>;
export declare function mapVotes(votes: PokerVote[]): Record<string, PokerVote>;
export declare function offlineSinceOf(members: PokerMember[], previous: Record<string, number>, at: number, serverOffsetMs?: number): Record<string, number>;
export declare function currentIssueOf(state: PokerState): PokerIssue | null;
export declare function scoreTypeOf(state: PokerState): ScoreType;
export declare function isModeratorOf(state: PokerState): boolean;
