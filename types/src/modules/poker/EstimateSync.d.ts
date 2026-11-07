import type { PokerIssue, PokerRoom, PokerVote } from '../../../shared/types/poker';
interface EstimateSyncProps {
    room: PokerRoom;
    issue: PokerIssue;
    vote: PokerVote;
}
export default function EstimateSync({ room, issue, vote }: EstimateSyncProps): import("react").JSX.Element | null;
export {};
