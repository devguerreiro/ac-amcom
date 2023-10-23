import { useState } from "react";

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

    function showFeedback(message: string, severity: AlertColor = "error") {
        updateState({
            ...initialState,
            message,
            severity,
            open: true,
        });
    }

    function closeFeedback() {
        updateState({
            ...initialState,
            open: false,
        });
    }

    return {
        state,
        showFeedback,
        closeFeedback,
    };
}

export interface IFeedbackState {
    state: IFeedback;
    showFeedback: (message: string, severity?: AlertColor) => void;
    closeFeedback: () => void;
}
