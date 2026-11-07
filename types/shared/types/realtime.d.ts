import type { EstimateSyncMode, HeartbeatResult, JoinRequestStatus, PokerInvitation, PokerIssue, PokerJoinRequest, PokerMember, PokerRoom, PokerRoomAccess, PokerUserRef, PokerVote, RoomSnapshot, VoteValue } from './poker';
export declare const clientActions: readonly ['auth', 'ping', 'requestResync', 'submitVote', 'startRound', 'restartRound', 'revealVotes', 'setFinalScore', 'addIssue', 'removeIssue', 'reorderIssues', 'updateSettings', 'updateAvatar', 'renameRoom', 'kickMember', 'transferModerator', 'leaveRoom', 'closeRoom', 'approveJoin', 'rejectJoin', 'approveAllJoin', 'rejectAllJoin', 'inviteMembers', 'revokeInvite', 'updateAccess', 'claimModerator', 'heartbeat', 'exitRoom'];
export type ClientAction = (typeof clientActions)[number];
export declare const serverActions: readonly ['authResult', 'pong', 'roomState', 'roomUpdated', 'memberJoined', 'memberUpdated', 'memberLeft', 'presenceUpdate', 'issuesUpdated', 'roundStarted', 'voteProgress', 'votesRevealed', 'voteUpdated', 'moderatorChanged', 'kicked', 'roomClosed', 'sessionTakenOver', 'joinRequested', 'joinRequestResolved', 'membersJoined', 'invitationsUpdated', 'heartbeatResult', 'ack', 'error'];
export type ServerAction = (typeof serverActions)[number];
export interface ClientMessage<TPayload = unknown> {
    action: ClientAction;
    requestId?: string;
    payload?: TPayload;
}
export interface ServerMessage<TPayload = unknown> {
    action: ServerAction;
    requestId?: string;
    revision?: number;
    payload?: TPayload;
}
export interface AuthPayload {
    token: string;
    roomId: string;
}
export interface AuthResultPayload {
    ok: boolean;
    sid?: string;
    roomId?: string;
    error?: string;
}
export type RoomStatePayload = RoomSnapshot;
export interface RoomUpdatedPayload {
    room: PokerRoom;
}
export interface MemberJoinedPayload {
    member: PokerMember;
}
export interface MemberUpdatedPayload {
    member: PokerMember;
}
export interface MemberLeftPayload {
    sid: string;
}
export interface PresenceUpdatePayload {
    onlineIds: string[];
}
export interface IssuesUpdatedPayload {
    issues: PokerIssue[];
    currentIssueId: string | null;
}
export interface RoundStartedPayload {
    currentIssueId: string;
    issues: PokerIssue[];
    vote: PokerVote;
}
export interface VoteProgressPayload {
    issueId: string;
    votedIds: string[];
}
export interface VotesRevealedPayload {
    vote: PokerVote;
}
export interface VoteUpdatedPayload {
    vote: PokerVote;
}
export interface SubmitVotePayload {
    issueId: string;
    vote: VoteValue;
}
export interface SetFinalScorePayload {
    issueId: string;
    finalScore: VoteValue;
    synced?: boolean;
}
export interface AddIssuePayload {
    issue: Omit<PokerIssue, 'id'> & {
        id?: string;
    };
}
export interface RemoveIssuePayload {
    issueId: string;
}
export interface ReorderIssuesPayload {
    issueIds: string[];
}
export interface UpdateSettingsPayload {
    autoReveal?: boolean;
    showHalfScore?: boolean;
    maxPoints?: number;
    allowRevote?: boolean;
    estimateSync?: EstimateSyncMode;
}
export interface UpdateAvatarPayload {
    avatarId: number | null;
}
export interface RenameRoomPayload {
    roomName: string;
}
export interface MemberTargetPayload {
    sid: string;
}
export interface JoinRequestedPayload {
    request: PokerJoinRequest;
}
export interface JoinRequestResolvedPayload {
    requestIds: string[];
    status: JoinRequestStatus;
}
export interface MembersJoinedPayload {
    members: PokerMember[];
}
export interface InvitationsUpdatedPayload {
    invitations: PokerInvitation[];
}
export type HeartbeatResultPayload = HeartbeatResult;
export interface RequestIdPayload {
    requestId: string;
    reason?: string;
}
export interface BulkJoinPayload {
    reason?: string;
    disableApproval?: boolean;
}
export interface InviteMembersPayload {
    users: PokerUserRef[];
}
export interface RevokeInvitePayload {
    userId: string;
}
export type UpdateAccessPayload = Partial<PokerRoomAccess>;
export interface LeaveRoomPayload {
    successorSid?: string;
}
export interface RoomClosedPayload {
    reason: string;
}
export interface ErrorPayload {
    code: string;
    message: string;
    action?: ClientAction;
}
export declare const roomResyncScope = "room";
export declare function isClientAction(value: unknown): value is ClientAction;
