import type { ComponentType } from 'react';
import type { ServiceContainer } from 'fluxo-ui/services';
import type { CreateRoomRequest, DirectoryRoom, JoinPendingResponse, JoinRequestStatus, JoinRoomRequest, MemberRole, PokerIssue, PokerRoom, PokerSession, PokerUserRef, RoomDirectory, RoomSnapshot, RoomSummary } from '../../shared/types/poker';
import type { ClientAction, ServerMessage } from '../../shared/types/realtime';
export declare const pokerServices: {
    readonly room: 'PokerRoomService';
    readonly session: 'PokerSessionService';
    readonly realtime: 'PokerRealtimeService';
    readonly identity: 'PokerIdentityService';
    readonly issues: 'PokerIssueProvider';
    readonly host: 'PokerHostService';
    readonly directory: 'PokerDirectoryService';
    readonly userPicker: 'PokerUserPicker';
};
export type PokerServiceName = (typeof pokerServices)[keyof typeof pokerServices];
export declare function registerPokerService<T>(container: ServiceContainer, name: PokerServiceName, factory: () => T): void;
export declare function resolvePokerService<T>(container: ServiceContainer, name: PokerServiceName): T;
export declare function hasPokerService(container: ServiceContainer, name: PokerServiceName): boolean;
export declare const requiredPokerServices: PokerServiceName[];
export interface SessionResponse extends PokerSession {
    room: PokerRoom;
}
export interface StoredSession {
    token: string;
    sid: string;
    roomId: string;
    role: MemberRole;
    expiresAt: string;
    name: string;
}
export interface JoinStatusRequest {
    roomId: string;
    requestId: string;
    email?: string;
    name?: string;
    avatarId?: number | null;
    avatarUrl?: string;
}
export interface JoinStatusResponse {
    status: JoinRequestStatus;
    reason?: string;
    session?: SessionResponse;
}
export interface PokerRoomService {
    createRoom(request: CreateRoomRequest): Promise<SessionResponse>;
    joinRoom(request: JoinRoomRequest): Promise<SessionResponse | JoinPendingResponse>;
    getJoinStatus(request: JoinStatusRequest): Promise<JoinStatusResponse>;
    cancelJoinRequest(request: JoinStatusRequest): Promise<void>;
    getRoomSummary(roomId: string): Promise<RoomSummary>;
    getSnapshot(): Promise<RoomSnapshot>;
    refreshSession?(): Promise<SessionResponse | null>;
}
export interface PokerSessionService {
    store(session: PokerSession, name: string): void;
    clear(): void;
    getSession(): StoredSession | null;
    sessionFor(roomId: string): StoredSession | null;
}
export type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'degraded' | 'closed';
export type ServerMessageListener = (message: ServerMessage) => void;
export type StatusListener = (status: ConnectionStatus) => void;
export interface PokerRealtimeService {
    connect(roomId: string): void;
    disconnect(intentional?: boolean): void;
    send<TPayload>(action: ClientAction, payload?: TPayload): Promise<boolean>;
    requestResync(): void;
    onMessage(listener: ServerMessageListener): () => void;
    onStatusChange(listener: StatusListener): () => void;
    getStatus(): ConnectionStatus;
}
export interface PokerIdentity {
    id?: string;
    name: string;
    email?: string;
    avatarUrl?: string;
}
export interface PokerIdentityService {
    requiresEmail: boolean;
    allowsAvatarPicker: boolean;
    getIdentity(): Promise<PokerIdentity | null>;
}
export interface IssueSuggestion {
    id: string;
    key: string;
    summary: string;
    icon?: string;
    url?: string;
    root?: string;
}
export type EstimateTarget = {
    ready: true;
    fieldName: string;
} | {
    ready: false;
    reason: string;
};
export interface PokerIssueProvider {
    isAvailable(): Promise<boolean>;
    lookupIssues(query: string): Promise<IssueSuggestion[]>;
    getIssue(key: string): Promise<PokerIssue | null>;
    getEstimateTarget(): Promise<EstimateTarget | null>;
    updateEstimate(issue: PokerIssue, points: number): Promise<void>;
}
export interface PokerHostCapabilities {
    directory: boolean;
    invitations: boolean;
    listing: boolean;
    presenceHeartbeat: boolean;
}
export interface PokerHostDefaults {
    requireApproval: boolean;
    listed: boolean;
}
export interface PokerHostService {
    capabilities: PokerHostCapabilities;
    defaults: PokerHostDefaults;
    shareUrl(roomId: string): string;
    navigateToRoom?(roomId: string): void;
    navigateHome?(): void;
    onRoomLeft?(): void;
    hidesThemeToggle?: boolean;
}
export interface PokerDirectoryService {
    list(): Promise<RoomDirectory>;
}
export interface UserPickerProps {
    excludeIds: string[];
    selected: PokerUserRef[];
    onChange(users: PokerUserRef[]): void;
    multiple?: boolean;
    disabled?: boolean;
}
export type PokerUserPicker = ComponentType<UserPickerProps>;
export interface PokerRetryPolicy {
    baseDelayMs: number;
    maxDelayMs: number;
    maxAttempts: number;
    jitterRatio: number;
}
export declare const defaultRetryPolicy: PokerRetryPolicy;
export type { DirectoryRoom, RoomDirectory };
