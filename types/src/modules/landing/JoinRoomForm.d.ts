import type { JoinPendingResponse } from '../../../shared/types/poker';
export interface PendingJoin {
    request: JoinPendingResponse;
    name: string;
    email?: string;
    avatarId: number | null;
    avatarUrl?: string;
}
interface JoinRoomFormProps {
    roomId?: string;
    onJoined: (roomId: string) => void;
    onPending: (pending: PendingJoin) => void;
}
export default function JoinRoomForm({ roomId: lockedRoomId, onJoined, onPending }: JoinRoomFormProps): import("react").JSX.Element;
export {};
