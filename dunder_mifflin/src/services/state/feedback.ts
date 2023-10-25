import { useCallback, useMemo, useState } from "react";

import { AlertColor, SnackbarOrigin } from "@mui/material";

interface IFeedback {
    message: string;
    severity: AlertColor;
    open: boolean;
    place: SnackbarOrigin;
    timeout: number;
}

const initialState: IFeedback = {
    message: "",
    severity: "error",
    open: false,
    place: {
        horizontal: "right",
        vertical: "top",
    },
    timeout: 5000,
};

export default function useFeedbackState(): IFeedbackState {
    const [state, updateState] = useState<IFeedback>(initialState);

    const showFeedback = useCallback(
        (message: string, severity: AlertColor = "error") => {
            updateState({
                ...initialState,
                message,
                severity,
                open: true,
            });
        },
        []
    );

    const closeFeedback = useCallback(() => {
        updateState({
            ...initialState,
            open: false,
        });
    }, []);

    return useMemo(
        () => ({
            state,
            showFeedback,
            closeFeedback,
        }),
        [state, showFeedback, closeFeedback]
    );
}

export interface IFeedbackState {
    state: IFeedback;
    showFeedback: (message: string, severity?: AlertColor) => void;
    closeFeedback: () => void;
}
