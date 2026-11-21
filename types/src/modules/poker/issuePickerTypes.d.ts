import type { PokerIssue } from '../../../shared/types/poker';
import type { IssueSuggestion } from '../../contracts';
export type PickerMode = 'jira' | 'sprint' | 'query' | 'custom';
export interface SingleIssuePickerProps {
    onPick: (issue: Partial<PokerIssue>) => void;
}
export interface IssuePickerProps extends SingleIssuePickerProps {
    onPickMany: (issues: IssueSuggestion[]) => Promise<number>;
}
