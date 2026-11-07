interface LeaveRoomDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onHandOver: (successorSid: string) => Promise<void>;
    onCloseRoom: () => Promise<void>;
}
export default function LeaveRoomDialog({ isOpen, onClose, onHandOver, onCloseRoom }: LeaveRoomDialogProps): import("react").JSX.Element;
export {};
