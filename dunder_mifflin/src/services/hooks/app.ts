import useFeedbackState from "../state/feedback";

import { IAppStateContext } from "../contexts/app";

export default function useAppState(): IAppStateContext {
    const feedbackState = useFeedbackState();

    return {
        feedback: feedbackState,
    };
}
