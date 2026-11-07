import type { ClientAction } from '../shared/types/realtime';
import type { EngineDeps } from './ports';
import { type RoomsApi } from './rooms';
import type { ActionOutcome, DispatchInput } from './types';
export declare function createDispatcher(deps: EngineDeps, rooms: RoomsApi): {
    dispatch: (input: DispatchInput) => Promise<ActionOutcome>;
    isHandled: (action: ClientAction) => boolean;
};
export type Dispatcher = ReturnType<typeof createDispatcher>;
