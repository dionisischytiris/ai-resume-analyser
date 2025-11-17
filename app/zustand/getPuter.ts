// Safely read window.puter
export const getPuter = () =>
    typeof window !== "undefined" && window.puter ? window.puter : null;