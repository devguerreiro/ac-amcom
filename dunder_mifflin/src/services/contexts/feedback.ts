import { createContext } from "react";

import { AlertColor, SnackbarOrigin } from "@mui/material";

interface IFeedback {
    message: string;
    severity: AlertColor;
    open: boolean;
    place: SnackbarOrigin;
    timeout: number;
}

export interface IFeedbackContext {
    feedback: IFeedback;
    showFeedback: (message: string, severity?: AlertColor) => void;
    closeFeedback: () => void;
}

export const DefaultFeedback: IFeedback = {
    message: "",
    severity: "error",
    open: false,
    place: {
        horizontal: "right",
        vertical: "top",
    },
    timeout: 5000,
};

// @ts-ignore
export default createContext<IFeedbackContext>(null);
