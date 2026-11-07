import type { ScoreType, VoteValue } from '../types/poker';
export declare const notSureVote = "?";
export declare const breakVote = "~";
export declare const specialVotes: string[];
export declare const scoresList: Record<ScoreType, VoteValue[]>;
export declare const scoreTypes: ScoreType[];
export declare const scoreTypeLabels: Record<ScoreType, string>;
export declare const defaultMaxPoints: Record<ScoreType, number>;
export declare function isScoreType(value: unknown): value is ScoreType;
export declare function maxPointOptions(scoreType: ScoreType): number[];
export declare function isValidVote(scoreType: ScoreType, vote: unknown): vote is VoteValue;
export declare function isNumericVote(vote: VoteValue | undefined): vote is number;
export interface VoteSummary {
    average?: number;
    maxVote?: number;
    finalScore?: VoteValue;
}
export declare function summarizeVotes(values: Record<string, VoteValue>, memberIds: string[], scoreType: ScoreType): VoteSummary;
export declare function visibleCards(scoreType: ScoreType, maxPoints: number, showHalfScore: boolean): VoteValue[];
