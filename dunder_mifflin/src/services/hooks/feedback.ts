import { createContext, useState } from "react";

import { AlertColor, SnackbarOrigin } from "@mui/material";

interface IFeedback {
    message: string;
    severity: AlertColor;
    open: boolean;
    place: SnackbarOrigin;
    timeout: number;
}

const DefaultFeedback: IFeedback = {
    message: "",
    severity: "error",
    open: false,
    place: {
        horizontal: "right",
        vertical: "top",
    },
    timeout: 5000,
};

type FeedbackHook = {
    feedback: IFeedback;
    showFeedback: (message: string, severity?: AlertColor) => void;
    closeFeedback: () => void;
};

export default function useFeedback(): FeedbackHook {
    const [feedback, setFeedback] = useState<IFeedback>(DefaultFeedback);

    const showFeedback = (message: string, severity: AlertColor = "error") => {
        setFeedback({
            ...DefaultFeedback,
            message,
            severity,
            open: true,
        });
    };

    const closeFeedback = () => {
        setFeedback({
            ...DefaultFeedback,
            open: false,
        });
    };

    return {
        feedback,
        showFeedback,
        closeFeedback,
    };
}

// @ts-ignore
export const FeedbackContext = createContext<FeedbackHook>(null);
