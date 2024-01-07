import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { auth } from "src/firebase";
import { useAuth } from "src/hooks/useAuth";

interface AuthContextState {
    user: User | null,
    error: string,
    isLoading: boolean,
    signin: (email: string, password: string) => Promise<void>,
    signup: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>({
    user: null,
    error: '',
    isLoading: false,
    signin: async () => { },
    signup: async () => { },
    logout: async () => { }
})


const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const { user, error, isLoading, signin, signup, logout, setUser, setIsLoading } = useAuth();
    const [initialLoader, setInitialLoader] = useState<boolean>(true);

    const value = useMemo(
        () => ({
            user,
            error,
            isLoading,
            signin,
            signup,
            logout,
        }),

        // eslint-disable-next-line
        [user, isLoading, error]
    )

    useEffect(() => onAuthStateChanged(auth, user => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
        setIsLoading(false)
        setInitialLoader(false);
    }),
        // eslint-disable-next-line
        [])


    return <AuthContext.Provider value={value}>{!initialLoader ? children : 'Loading...'}</AuthContext.Provider>;

};

export default AuthContextProvider;