import { RESET_APP, TOGGLE_DARK_MODE } from "./types";

export function resetAppInState() {
    return {
        type: RESET_APP,
    };
}

export function toggleDarkMode() {
    return {
        type: TOGGLE_DARK_MODE,
    };
}
