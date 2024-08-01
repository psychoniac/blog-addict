"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/db/configFirebase";
import { onAuthStateChanged, User, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const providerGithub = new GithubAuthProvider();
const providerGoogle = new GoogleAuthProvider();

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isFetch, setIsFetch] = useState(true);
    const router = useRouter();

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, providerGoogle);
            setUser(result.user);
            router.push('dashboard');
        } catch(error){
            console.error(error);
        }
    };

    const loginWithGithub = async () => {
        try {
            const result = await signInWithPopup(auth, providerGithub);
            setUser(result.user);
            router.push('dashboard');
        } catch(error){
            console.error(error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user);
            }else{
                setUser(null);
            }
        }) 
        return () => unsubscribe();
    }, [])

    // fonction de redirection si l'utilisateur n'est pas connécter
    const redirectIfAuthenticated = () => {
        if(user){
            router.push('dashboard');
        }
    };

    return {user, isFetch, redirectIfAuthenticated, loginWithGoogle, loginWithGithub};
}