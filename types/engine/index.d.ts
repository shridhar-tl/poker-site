import type { EngineDeps } from './ports';
export declare function createEngine(deps: EngineDeps): {
    rooms: {
        createRoom: (input: import("./rooms").CreateRoomInput) => Promise<{
            room: import("./types").RoomRecord;
            member: import("./types").MemberRecord;
        }>;
        joinRoom: (input: import("./rooms").JoinRoomInput) => Promise<import("./rooms").JoinOutcome>;
        admit: (room: import("./types").RoomRecord, input: import("./rooms").JoinRoomInput) => Promise<{
            room: import("./types").RoomRecord;
            member: import("./types").MemberRecord;
        }>;
        purgeStaleRequests: (roomId: string, requests: import("./types").JoinRequestRecord[]) => Promise<import("./types").JoinRequestRecord[]>;
        getJoinRequest: (roomId: string, memberKey: string) => Promise<{
            status: import("../shared/types/poker").JoinRequestStatus;
            reason?: string;
            admitted: boolean;
        }>;
        cancelJoinRequest: (roomId: string, memberKey: string) => Promise<import("./types").EngineEvent[]>;
        getSummary: (roomIdInput: unknown) => Promise<import("../shared/types/poker").RoomSummary>;
        buildSnapshot: (roomId: string, sid: string) => Promise<import("../shared/types/poker").RoomSnapshot>;
        listDirectory: (memberKey: string) => Promise<import("../src/contracts").RoomDirectory>;
        announceMember: (roomId: string, sid: string) => Promise<import("./types").EngineEvent[]>;
        membersJoinedEvent: (members: import("./types").MemberRecord[], online: Set<string>) => import("./types").EngineEvent;
        requireRoom: (roomId: string) => Promise<import("./types").RoomRecord>;
        forbidden: typeof import("./errors").forbiddenError;
    };
    dispatch: (input: import("./types").DispatchInput) => Promise<import("./types").ActionOutcome>;
    isHandled: (action: import("../shared/types/realtime").ClientAction) => boolean;
    deps: EngineDeps;
};
export type Engine = ReturnType<typeof createEngine>;
export * from './errors';
export * from './mappers';
export * from './ports';
export * from './types';
export { normalizeIssue, normalizeUserRef, parseAvatarId, parseScoreType } from './rooms';
export type { CreateRoomInput, JoinOutcome, JoinRoomInput, RoomsApi } from './rooms';
export { optionalHttpUrl, optionalText, requireRoomId, requireText, sanitizeText } from './util';
export { summarizeVotes } from '../shared/poker/scores';
