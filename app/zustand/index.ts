// store/index.ts
import {create} from "zustand";

import {createSetError} from "~/zustand/error";
import {createAuthSlice} from "~/zustand/creators/auth";
import {createFsSlice} from "~/zustand/creators/fs";
import {createAISlice} from "~/zustand/creators/ai";
import {createKVSlice} from "~/zustand/creators/kv";
import {createThemeSlice} from "~/zustand/creators/theme";
import type {PuterStore} from "./types";

export const usePuterStore = create<PuterStore>((set, get) => {
    const setError = createSetError(set, get);

    const authSlice = createAuthSlice(set, get, setError)

    return {
        isLoading: true,
        error: null,
        puterReady: false,

        ...createThemeSlice(set, get),
        auth: createAuthSlice(set, get, setError),
        fs: createFsSlice(set, get, setError),
        ai: createAISlice(set, get, setError),
        kv: createKVSlice(set, get, setError),

        clearError: () => set({error: null}),

        init: () => {
            const interval = setInterval(() => {
                if (window.puter) {
                    clearInterval(interval);
                    set({puterReady: true});
                    authSlice.checkAuthStatus();
                }
            }, 100);

            setTimeout(() => {
                clearInterval(interval);
                if (!window.puter) setError("Puter.js failed to load within 10 seconds");
            }, 10000);
        },
    };
});
