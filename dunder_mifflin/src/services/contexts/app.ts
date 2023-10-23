import { createContext } from "react";

import { IFeedbackState } from "../state/feedback";

export interface IAppStateContext {
    feedback: IFeedbackState;
}

// @ts-ignore
const AppStateContext = createContext<IAppStateContext>(null);

export default AppStateContext;
