import type { JoinRequestStatus, PokerIssue, PokerUserRef, RoomDirectory, RoomSnapshot, RoomSummary, ScoreType } from '../shared/types/poker';
import { forbiddenError } from './errors';
import type { EngineDeps } from './ports';
import type { EngineEvent, JoinRequestRecord, MemberRecord, RoomRecord } from './types';
export interface CreateRoomInput {
    memberKey: string;
    name: string;
    roomName: string;
    scoreType: ScoreType;
    avatarId: number | null;
    avatarUrl?: string;
    requireApproval?: boolean;
    listed?: boolean;
    invitees?: PokerUserRef[];
}
export interface JoinRoomInput {
    roomId: string;
    memberKey: string;
    name: string;
    avatarId: number | null;
    avatarUrl?: string;
}
export type JoinOutcome = {
    kind: 'joined';
    room: RoomRecord;
    member: MemberRecord;
    isNew: boolean;
} | {
    kind: 'pending';
    room: RoomRecord;
    request: JoinRequestRecord;
    events: EngineEvent[];
};
export declare function parseScoreType(value: unknown): ScoreType;
export declare function parseAvatarId(value: unknown): number | null;
export declare function normalizeIssue(input: Partial<PokerIssue>, newId: (size: number) => string): PokerIssue;
export declare function normalizeUserRef(input: unknown): PokerUserRef;
export declare function createRoomsApi(deps: EngineDeps): {
    createRoom: (input: CreateRoomInput) => Promise<{
        room: RoomRecord;
        member: MemberRecord;
    }>;
    joinRoom: (input: JoinRoomInput) => Promise<JoinOutcome>;
    admit: (room: RoomRecord, input: JoinRoomInput) => Promise<{
        room: RoomRecord;
        member: MemberRecord;
    }>;
    purgeStaleRequests: (roomId: string, requests: JoinRequestRecord[]) => Promise<JoinRequestRecord[]>;
    getJoinRequest: (roomId: string, memberKey: string) => Promise<{
        status: JoinRequestStatus;
        reason?: string;
        admitted: boolean;
    }>;
    cancelJoinRequest: (roomId: string, memberKey: string) => Promise<EngineEvent[]>;
    getSummary: (roomIdInput: unknown) => Promise<RoomSummary>;
    buildSnapshot: (roomId: string, sid: string) => Promise<RoomSnapshot>;
    listDirectory: (memberKey: string) => Promise<RoomDirectory>;
    announceMember: (roomId: string, sid: string) => Promise<EngineEvent[]>;
    membersJoinedEvent: (members: MemberRecord[], online: Set<string>) => EngineEvent;
    requireRoom: (roomId: string) => Promise<RoomRecord>;
    forbidden: typeof forbiddenError;
};
export type RoomsApi = ReturnType<typeof createRoomsApi>;
