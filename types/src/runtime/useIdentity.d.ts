import type { PokerIdentity } from '../contracts';
export interface IdentityState {
    ready: boolean;
    identity: PokerIdentity | null;
    requiresEmail: boolean;
    allowsAvatarPicker: boolean;
}
export default function useIdentity(): IdentityState;
