import type { PokerIssue } from '../../../shared/types/poker';
interface IssuePickerProps {
    onPick: (issue: Partial<PokerIssue>) => void;
}
export default function IssuePicker({ onPick }: IssuePickerProps): import("react").JSX.Element;
export {};
