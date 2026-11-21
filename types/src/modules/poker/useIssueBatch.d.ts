import type { IssueBatch } from '../../contracts';
export type IssueBatchStatus = 'idle' | 'loading' | 'ready' | 'error';
export interface IssueBatchState {
    status: IssueBatchStatus;
    batch: IssueBatch | null;
    error: string | null;
    version: number;
}
export default function useIssueBatch(): {
    load: (run: () => Promise<IssueBatch>) => Promise<void>;
    reset: () => void;
    status: IssueBatchStatus;
    batch: IssueBatch | null;
    error: string | null;
    version: number;
};
