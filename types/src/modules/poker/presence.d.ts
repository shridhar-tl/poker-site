import type { PokerMember } from '../../../shared/types/poker';
export declare function staleOnlineIds(members: PokerMember[], serverNowMs: number, thresholdMs: number, selfSid: string): string[];
export declare function serverOffsetOf(serverTime: string | undefined, localNowMs: number): number | null;
