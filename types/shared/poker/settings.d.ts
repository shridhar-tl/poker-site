import type { PokerRoomSettings, ScoreType } from '../types/poker';
export declare function defaultSettings(scoreType: ScoreType): PokerRoomSettings;
export declare function resolveSettings(scoreType: ScoreType, stored: Partial<PokerRoomSettings>): PokerRoomSettings;
