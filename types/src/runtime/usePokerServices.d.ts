import { type PokerDirectoryService, type PokerHostService, type PokerIdentityService, type PokerIssueProvider, type PokerRealtimeService, type PokerRoomService, type PokerSessionService, type PokerUserPicker } from '../contracts';
import type MessageService from '../services/message-service';
export interface PokerServices {
    room: PokerRoomService;
    session: PokerSessionService;
    realtime: PokerRealtimeService;
    identity: PokerIdentityService;
    host: PokerHostService;
    message: MessageService;
    issues: PokerIssueProvider | null;
    directory: PokerDirectoryService | null;
    userPicker: PokerUserPicker | null;
}
export default function usePokerServices(): PokerServices;
