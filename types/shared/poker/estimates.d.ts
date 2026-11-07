import type { EstimateSyncMode, PokerVote, ScoreType, VoteValue } from '../types/poker';
export declare const estimateSyncModes: EstimateSyncMode[];
export declare const estimateSyncLabels: Record<EstimateSyncMode, string>;
export declare function isEstimateSyncMode(value: unknown): value is EstimateSyncMode;
export declare function supportsEstimateSync(scoreType: ScoreType): boolean;
export declare function consensusScore(values: Record<string, VoteValue>): number | undefined;
export declare function autoSyncScore(mode: EstimateSyncMode, vote: PokerVote): number | undefined;
