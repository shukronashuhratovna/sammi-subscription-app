import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { auth } from 'src/firebase'
import Cookies from 'js-cookie';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);

    const router = useRouter();

    const signup = async (email: string, password: string) => {
        setIsLoading(true);

        await createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                setUser(res.user);
                router.push('/');
                fetch('/api/customer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: res.user.email, user_id: res.user.uid }),
                });
                Cookies.set('user_id', res.user.uid);
                setIsLoading(true);
            })
            .catch(error => setError(error.message))
            .finally(() => setIsLoading(false));
    };

    const signin = async (email: string, password: string) => {
        setIsLoading(true);

        await signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                setUser(res.user);
                router.push('/');
                Cookies.set('user_id', res.user.uid);
                setIsLoading(true);
            })
            .catch(error => setError(error.message))
            .finally(() => setIsLoading(false));
    };
    const logout = async () => {
        setIsLoading(true);

        await signOut(auth)
            .then(() => {
                setUser(null);
                router.push('/auth');
                Cookies.remove('user_id');
            })
            .catch(error => setError(error.message))
            .finally(() => setIsLoading(false))
    }

    return { error, isLoading, user, signin, signup, logout, setUser, setIsLoading }
};