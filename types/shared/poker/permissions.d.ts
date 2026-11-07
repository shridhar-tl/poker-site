import type { MemberRole } from '../types/poker';
import type { ClientAction } from '../types/realtime';
export interface RoomPrincipal {
    sid: string;
    roomId: string;
    role: MemberRole;
}
export declare function isAuth(principal: RoomPrincipal | null, roomId: string): principal is RoomPrincipal;
export declare function isMod(principal: RoomPrincipal | null, roomId: string): boolean;
export declare function isSelf(principal: RoomPrincipal | null, roomId: string, sid: string): boolean;
export declare const moderatorOnlyActions: ClientAction[];
export declare function requiresModerator(action: ClientAction): boolean;
export declare function canReadVoteValues(options: {
    revealed: boolean;
    isOwnVote: boolean;
}): boolean;
export declare function canSubmitVote(options: {
    revealed: boolean;
    isCurrentIssue: boolean;
    hasVoted: boolean;
    allowRevote: boolean;
}): boolean;
