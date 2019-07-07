import { UserState } from "./user/reducer";
import { RatesState } from "./rates/reducer";

export interface CombinedState {
    user: UserState,
    rates: RatesState
};

