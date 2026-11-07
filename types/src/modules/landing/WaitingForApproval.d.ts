import type { PendingJoin } from './JoinRoomForm';
interface WaitingForApprovalProps {
    pending: PendingJoin;
    onApproved: (roomId: string) => void;
    onDismissed: () => void;
}
export default function WaitingForApproval({ pending, onApproved, onDismissed }: WaitingForApprovalProps): import("react").JSX.Element;
export {};
