export declare const BasePathContext: import("react").Context<string>;
export declare function usePokerNavigate(): {
    to: (path: string) => string;
    toRoom: (roomId: string) => void;
    toHome: () => void;
    toJoin: (roomId: string) => void | Promise<void>;
    toRooms: () => void | Promise<void>;
    toCreate: () => void | Promise<void>;
};
export default usePokerNavigate;
