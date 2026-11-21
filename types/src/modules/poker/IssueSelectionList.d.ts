import type { IssueBatch, IssueSuggestion } from '../../contracts';
interface IssueSelectionListProps {
    batch: IssueBatch;
    limit: number;
    emptyMessage: string;
    onAdd: (issues: IssueSuggestion[]) => Promise<number>;
}
export default function IssueSelectionList({ batch, limit, emptyMessage, onAdd }: IssueSelectionListProps): import("react").JSX.Element;
export {};
