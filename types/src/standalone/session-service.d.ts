import type { PokerSession } from '../../shared/types/poker';
import type { PokerSessionService, StoredSession } from '../contracts';
export default class SessionService implements PokerSessionService {
    private session;
    constructor();
    private readFromStorage;
    private writeToStorage;
    store(session: PokerSession, name: string): void;
    clear(): void;
    getSession(): StoredSession | null;
    getToken(): string | null;
    sessionFor(roomId: string): StoredSession | null;
}
