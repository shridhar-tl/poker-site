import type { PokerIssueProvider } from '../../contracts';
import type { IssuePickerProps, PickerMode } from './issuePickerTypes';
interface ProviderIssuePickerProps extends IssuePickerProps {
    provider: PokerIssueProvider;
    mode: PickerMode;
    onModeChange: (mode: PickerMode) => void;
}
export default function ProviderIssuePicker({ provider, mode, onModeChange, onPick, onPickMany }: ProviderIssuePickerProps): import("react").JSX.Element;
export {};
