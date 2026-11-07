interface AvatarPickerProps {
    value: number | null;
    onChange: (avatarId: number | null) => void;
    label?: string;
    profileImageUrl?: string;
    offersRandom?: boolean;
    className?: string;
}
export default function AvatarPicker({ value, onChange, label, profileImageUrl, offersRandom, className }: AvatarPickerProps): import("react").JSX.Element;
export {};
