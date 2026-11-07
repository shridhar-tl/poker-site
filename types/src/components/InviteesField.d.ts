import type { PokerUserRef } from '../../shared/types/poker';
interface InviteesFieldProps {
    selected: PokerUserRef[];
    onChange: (users: PokerUserRef[]) => void;
    excludeIds?: string[];
    disabled?: boolean;
}
export default function InviteesField({ selected, onChange, excludeIds, disabled }: InviteesFieldProps): import("react").JSX.Element | null;
export {};
