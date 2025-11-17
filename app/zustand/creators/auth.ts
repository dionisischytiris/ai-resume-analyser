import type {PuterStore} from "~/zustand/types";
import {getPuter} from "~/zustand/getPuter";

export const createAuthSlice = (
    set: (partial: Partial<PuterStore>) => void,
    get: () => PuterStore,
    setError: (err: string) => void
) => ({
    user: null as PuterUser | null,
    isAuthenticated: false,

    checkAuthStatus: async (): Promise<boolean> => {
        const puter = getPuter();
        if (!puter) {
            setError("Puter.js not available");
            return false;
        }

        set({isLoading: true, error: null});

        try {
            const signedIn = await puter.auth.isSignedIn();
            if (!signedIn) {
                set({auth: {...get().auth, user: null, isAuthenticated: false}, isLoading: false});
                return false;
            }

            const user = await puter.auth.getUser();
            set({auth: {...get().auth, user, isAuthenticated: true}, isLoading: false});
            return true;
        } catch (err: any) {
            setError(err instanceof Error ? err.message : "Failed to check auth status");
            return false;
        }
    },

    signIn: async (): Promise<void> => {
        const puter = getPuter();
        if (!puter) return setError("Puter.js not available");

        set({isLoading: true, error: null});

        try {
            await puter.auth.signIn();
            await get().auth.checkAuthStatus(); // now directly on auth
        } catch (err: any) {
            setError(err instanceof Error ? err.message : "Sign in failed");
        }
    },

    signOut: async (): Promise<void> => {
        const puter = getPuter();
        if (!puter) return setError("Puter.js not available");

        set({isLoading: true, error: null});

        try {
            await puter.auth.signOut();
            set({auth: {...get().auth, user: null, isAuthenticated: false}, isLoading: false});
        } catch (err: any) {
            setError(err instanceof Error ? err.message : "Sign out failed");
        }
    },

    refreshUser: async (): Promise<void> => {
        const puter = getPuter();
        if (!puter) return setError("Puter.js not available");

        set({isLoading: true, error: null});

        try {
            const user = await puter.auth.getUser();
            set({auth: {...get().auth, user, isAuthenticated: !!user}, isLoading: false});
        } catch (err: any) {
            setError(err instanceof Error ? err.message : "Failed to refresh user");
        }
    },

    getUser: (): PuterUser | null => get().auth.user, // directly
});
