export declare const fallbackAvatar = "\uD83D\uDC64";
export declare const avatars: string[];
export declare function avatarOf(avatarId: number | null | undefined): string;
export declare function randomAvatarId(): number;
export declare function initialAvatarId(avatarId: number | null, avatarUrl: string | undefined): number | null;
export declare function isValidAvatarId(value: unknown): value is number;
