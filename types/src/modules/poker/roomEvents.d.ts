import type { ServerMessage } from '../../../shared/types/realtime';
import type MessageService from '../../services/message-service';
import { type PokerState } from '../../store/poker-store';
export interface RoomEventContext {
    message: MessageService;
    resync: () => void;
    sendBulkJoin: (action: 'approveAllJoin' | 'rejectAllJoin', disableApproval: boolean) => void;
}
type Effect = () => void;
type Patch = Partial<PokerState>;
interface Reduction {
    patch: Patch;
    effects: Effect[];
}
export declare function reduceServerMessage(state: PokerState, message: ServerMessage, context: RoomEventContext): Reduction;
export declare function handleServerMessage(message: ServerMessage, context: RoomEventContext): void;
export declare function expireStaleOnlineMembers(): void;
export {};
