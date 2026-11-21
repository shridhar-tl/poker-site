import type { IssueSuggestion, PokerQuerySource } from '../../contracts';
interface QueryIssueLoaderProps {
    source: PokerQuerySource;
    onAdd: (issues: IssueSuggestion[]) => Promise<number>;
}
export default function QueryIssueLoader({ source, onAdd }: QueryIssueLoaderProps): import("react").JSX.Element;
export {};
