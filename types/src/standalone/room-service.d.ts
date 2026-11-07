import type { CreateRoomRequest, JoinPendingResponse, JoinRoomRequest, RoomSnapshot, RoomSummary } from '../../shared/types/poker';
import { type JoinStatusRequest, type JoinStatusResponse, type PokerRoomService, type SessionResponse } from '../contracts';
import type AjaxService from './ajax-service';
import type SessionService from './session-service';
export default class RoomService implements PokerRoomService {
    static dependencies: string[];
    private $ajax;
    private $session;
    constructor($ajax: AjaxService, $session: SessionService);
    createRoom(request: CreateRoomRequest): Promise<SessionResponse>;
    joinRoom(request: JoinRoomRequest): Promise<SessionResponse | JoinPendingResponse>;
    getJoinStatus(request: JoinStatusRequest): Promise<JoinStatusResponse>;
    cancelJoinRequest(request: JoinStatusRequest): Promise<void>;
    getRoomSummary(roomId: string): Promise<RoomSummary>;
    getSnapshot(): Promise<RoomSnapshot>;
    refreshSession(): Promise<SessionResponse | null>;
}
