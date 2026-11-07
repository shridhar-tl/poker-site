interface RoomClosedNoticeProps {
    reason: string;
    onExit: () => void;
}
export default function RoomClosedNotice({ reason, onExit }: RoomClosedNoticeProps): import("react").JSX.Element;
export {};
