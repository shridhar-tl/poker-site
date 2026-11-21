import type { IssueSuggestion, PokerSprintSource } from '../../contracts';
interface SprintIssueLoaderProps {
    source: PokerSprintSource;
    onAdd: (issues: IssueSuggestion[]) => Promise<number>;
}
export default function SprintIssueLoader({ source, onAdd }: SprintIssueLoaderProps): import("react").JSX.Element;
export {};
