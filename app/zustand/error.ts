// Creates a consistent error setter
export const createSetError =
    (set: any, get: any) =>
        (msg: string) => {
            set({
                error: msg,
                isLoading: false,
                auth: {
                    user: null,
                    isAuthenticated: false,
                    signIn: get().auth.signIn,
                    signOut: get().auth.signOut,
                    refreshUser: get().auth.refreshUser,
                    checkAuthStatus: get().auth.checkAuthStatus,
                    getUser: get().auth.getUser,
                },
            });
        };