import type { PokerInvitation, PokerJoinRequest, PokerMember, PokerRoom, PokerVote } from '../shared/types/poker';
import type { JoinRequestRecord, MemberRecord, RoomRecord, VoteRecord } from './types';
export declare function toRoom(room: RoomRecord): PokerRoom;
export declare function toMember(member: MemberRecord, isOnline: boolean): PokerMember;
export declare function toVote(vote: VoteRecord, viewerSid: string): PokerVote;
export declare function toRevealedVote(vote: VoteRecord): PokerVote;
export declare function toEmptyVote(vote: VoteRecord): PokerVote;
export declare function toJoinRequest(request: JoinRequestRecord): PokerJoinRequest;
export declare function toInvitation(invitation: PokerInvitation): PokerInvitation;
