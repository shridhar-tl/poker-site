import type { ServiceContainer } from 'fluxo-ui/services';
export interface PokerAppProps {
    container: ServiceContainer;
    basePath: string;
    manageToasts?: boolean;
}
export default function PokerApp({ container, basePath, manageToasts }: PokerAppProps): import("react").JSX.Element;
