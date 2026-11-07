import type { VoteValue } from '../shared/types/poker';
import type { FinalScorePatch, InvitationRecord, JoinRequestRecord, MemberPatch, MemberRecord, RoomPatch, RoomRecord, RoundStart, SubmitVoteOutcome, VoteRecord, VoteSummaryFields } from './types';
export interface RoomStore {
    getRoom(roomId: string): Promise<RoomRecord | null>;
    createRoom(room: RoomRecord, member: MemberRecord): Promise<boolean>;
    updateRoom(roomId: string, patch: RoomPatch): Promise<RoomRecord | null>;
    bumpRevision(roomId: string): Promise<number>;
    removeRoom(roomId: string): Promise<void>;
    getMember(roomId: string, sid: string): Promise<MemberRecord | null>;
    listMembers(roomId: string): Promise<MemberRecord[]>;
    putMember(roomId: string, member: MemberRecord): Promise<void>;
    updateMember(roomId: string, sid: string, patch: MemberPatch): Promise<MemberRecord | null>;
    removeMember(roomId: string, sid: string): Promise<void>;
    getVote(roomId: string, issueId: string): Promise<VoteRecord | null>;
    listVotes(roomId: string): Promise<VoteRecord[]>;
    removeVote(roomId: string, issueId: string): Promise<void>;
    startRound(roomId: string, round: RoundStart): Promise<void>;
    submitVote(roomId: string, issueId: string, sid: string, value: VoteValue): Promise<SubmitVoteOutcome>;
    revealVote(roomId: string, issueId: string, summary: VoteSummaryFields): Promise<VoteRecord | null>;
    setFinalScore(roomId: string, issueId: string, patch: FinalScorePatch): Promise<VoteRecord | null>;
    transferModerator(roomId: string, fromSid: string, toSid: string, toKey: string): Promise<boolean>;
    getJoinRequest(roomId: string, memberKey: string): Promise<JoinRequestRecord | null>;
    listJoinRequests(roomId: string): Promise<JoinRequestRecord[]>;
    putJoinRequest(request: JoinRequestRecord): Promise<void>;
    updateJoinRequest(roomId: string, memberKey: string, patch: Partial<Pick<JoinRequestRecord, 'status' | 'reason'>>): Promise<JoinRequestRecord | null>;
    removeJoinRequest(roomId: string, memberKey: string): Promise<void>;
}
export interface InvitationStore {
    listInvitations(roomId: string): Promise<InvitationRecord[]>;
    getInvitation(roomId: string, userId: string): Promise<InvitationRecord | null>;
    putInvitation(invitation: InvitationRecord): Promise<void>;
    removeInvitation(roomId: string, userId: string): Promise<void>;
}
export interface DirectoryStore {
    listListedRooms(limit: number): Promise<RoomRecord[]>;
    listRoomsOfMember(memberKey: string, limit: number): Promise<RoomRecord[]>;
    listInvitationsFor(userId: string, limit: number): Promise<InvitationRecord[]>;
    listJoinRequestsBy(memberKey: string, limit: number): Promise<JoinRequestRecord[]>;
    getRooms(roomIds: string[]): Promise<RoomRecord[]>;
    hostNames(rooms: RoomRecord[]): Promise<Map<string, string>>;
}
export interface PresencePort {
    onlineSids(roomId: string, members: MemberRecord[]): Promise<Set<string>>;
}
export interface RateLimiterPort {
    enforce(bucketKey: string, limit: number, message: string): Promise<void>;
}
export interface EngineConfig {
    maxRoomMembers: number;
    maxRoomIssues: number;
    maxRoomsPerMemberPerHour: number;
    maxInvitationsPerRoom: number;
    maxPendingJoinRequestsPerRoom: number;
    maxPendingJoinRequestsPerMember: number;
    bulkJoinBatchSize: number;
    joinRequestLifetimeMs: number;
    hostAwayGraceMs: number;
    defaultAccess: {
        requireApproval: boolean;
        listed: boolean;
    };
    directoryEnabled: boolean;
    invitationsEnabled: boolean;
    directoryLimit: number;
}
export interface EngineDeps {
    store: RoomStore;
    invitations?: InvitationStore;
    directory?: DirectoryStore;
    presence: PresencePort;
    rateLimiter?: RateLimiterPort;
    config: EngineConfig;
    now?: () => Date;
    newId?: (size: number) => string;
    newRoomId?: () => string;
}
export declare const defaultEngineConfig: EngineConfig;
