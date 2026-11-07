export type ScoreType = 1 | 2 | 3;
export type VoteValue = number | string;
export type MemberRole = 'mod' | 'player';
export type EstimateSyncMode = 'manual' | 'consensus' | 'finalScore';
export interface PokerIssue {
    id: string;
    key: string;
    url?: string;
    icon?: string;
    summary?: string;
    root?: string;
}
export interface PokerMember {
    id: string;
    name: string;
    role: MemberRole;
    avatarId: number | null;
    avatarUrl?: string;
    joinedAt: string;
    isOnline: boolean;
    lastSeenAt?: string;
    votedIssueIds: string[];
}
export interface PokerVote {
    issueId: string;
    reveal: boolean;
    values: Record<string, VoteValue>;
    average?: number;
    maxVote?: number;
    finalScore?: VoteValue;
    syncedScore?: VoteValue;
    revealedAt?: string;
}
export interface PokerRoomSettings {
    autoReveal: boolean;
    showHalfScore: boolean;
    maxPoints: number;
    allowRevote: boolean;
    estimateSync: EstimateSyncMode;
}
export interface PokerRoomAccess {
    requireApproval: boolean;
    listed: boolean;
}
export interface PokerRoom {
    roomId: string;
    roomName: string;
    scoreType: ScoreType;
    moderatorId: string;
    currentIssueId: string | null;
    issues: PokerIssue[];
    settings: PokerRoomSettings;
    access: PokerRoomAccess;
    revision: number;
    created: string;
    lastActivity: string;
}
export interface PokerUserRef {
    id: string;
    name: string;
    email?: string;
    avatarUrl?: string;
}
export type JoinRequestStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
export interface PokerJoinRequest {
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
export interface PokerInvitation {
    roomId: string;
    invitee: PokerUserRef;
    invitedBy: string;
    createdAt: string;
}
export interface PokerSession {
    token: string;
    sid: string;
    roomId: string;
    role: MemberRole;
    expiresAt: string;
}
export interface CreateRoomRequest {
    email?: string;
    name: string;
    roomName: string;
    scoreType: ScoreType;
    avatarId?: number | null;
    avatarUrl?: string;
    requireApproval?: boolean;
    listed?: boolean;
    invitees?: PokerUserRef[];
}
export interface JoinRoomRequest {
    email?: string;
    name: string;
    roomId: string;
    avatarId?: number | null;
    avatarUrl?: string;
    requestId?: string;
}
export interface RoomSnapshot {
    room: PokerRoom;
    members: PokerMember[];
    votes: PokerVote[];
    sid: string;
    role: MemberRole;
    joinRequests: PokerJoinRequest[];
    invitations: PokerInvitation[];
    serverTime: string;
}
export interface JoinPendingResponse {
    status: 'pending';
    requestId: string;
    roomId: string;
    roomName: string;
}
export interface RoomSummary {
    roomId: string;
    roomName: string;
    scoreType: ScoreType;
    memberCount: number;
    created: string;
    requireApproval: boolean;
}
export interface DirectoryRoom {
    roomId: string;
    roomName: string;
    scoreType: ScoreType;
    hostName: string;
    memberCount: number;
    requireApproval: boolean;
    created: string;
    lastActivity: string;
    isMember: boolean;
    isHost: boolean;
    invited: boolean;
    requestStatus?: JoinRequestStatus;
    requestId?: string;
    pendingRequests?: number;
}
export interface RoomDirectory {
    invited: DirectoryRoom[];
    mine: DirectoryRoom[];
    open: DirectoryRoom[];
}
export interface HeartbeatResult {
    serverTime: string;
    revision: number;
    onlineIds: string[];
    lastSeen?: Record<string, string>;
    pendingJoinRequests: number;
}
