import type { JoinRequestStatus, MemberRole, PokerInvitation, PokerIssue, PokerRoomAccess, PokerRoomSettings, ScoreType, VoteValue } from '../shared/types/poker';
import type { ClientAction, ServerAction } from '../shared/types/realtime';
export interface RoomRecord {
    roomId: string;
    roomName: string;
    scoreType: ScoreType;
    moderatorId: string;
    moderatorKey: string;
    currentIssueId: string | null;
    issues: PokerIssue[];
    settings: PokerRoomSettings;
    access: PokerRoomAccess;
    memberCount: number;
    revision: number;
    created: string;
    lastActivity: string;
}
export interface MemberRecord {
    sid: string;
    memberKey: string;
    name: string;
    role: MemberRole;
    avatarId: number | null;
    avatarUrl?: string;
    votedIssueIds: string[];
    joinedAt: string;
    lastSeenAt: string;
}
export interface VoteRecord {
    issueId: string;
    reveal: boolean;
    values: Record<string, VoteValue>;
    average?: number;
    maxVote?: number;
    finalScore?: VoteValue;
    syncedScore?: VoteValue;
    revealedAt?: string;
    createdAt: string;
}
export interface JoinRequestRecord {
    requestId: string;
    roomId: string;
    memberKey: string;
    name: string;
    avatarId: number | null;
    avatarUrl?: string;
    status: JoinRequestStatus;
    createdAt: string;
    reason?: string;
}
export type InvitationRecord = PokerInvitation;
export type RoomPatch = Partial<Pick<RoomRecord, 'roomName' | 'moderatorId' | 'moderatorKey' | 'currentIssueId' | 'issues' | 'settings' | 'access' | 'memberCount' | 'lastActivity'>>;
export type MemberPatch = Partial<Pick<MemberRecord, 'name' | 'role' | 'avatarId' | 'avatarUrl' | 'votedIssueIds' | 'lastSeenAt'>>;
export type SubmitVoteOutcome = {
    kind: 'stored';
    vote: VoteRecord;
} | {
    kind: 'revealed';
} | {
    kind: 'missing';
};
export interface VoteSummaryFields {
    average?: number;
    maxVote?: number;
    finalScore?: VoteValue;
}
export interface FinalScorePatch {
    finalScore: VoteValue;
    syncedScore?: VoteValue;
}
export interface RoundStart {
    vote: VoteRecord;
    roomPatch: RoomPatch;
    removeIssueId?: string;
}
export interface Principal {
    sid: string;
    roomId: string;
}
export type EventAudience = {
    kind: 'room';
    exceptSid?: string;
} | {
    kind: 'member';
    sid: string;
};
export interface EngineEvent {
    audience: EventAudience;
    action: ServerAction;
    payload: unknown;
}
export interface Disconnect {
    sids?: string[];
    all?: boolean;
}
export interface ActionOutcome {
    result?: unknown;
    events: EngineEvent[];
    disconnect?: Disconnect;
    roomClosed?: boolean;
    revision?: number;
}
export interface DispatchInput {
    principal: Principal;
    action: ClientAction;
    payload: Record<string, unknown>;
}
