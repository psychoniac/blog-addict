"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const ProtectedRoute = ({children} : {children: React.ReactNode}) => {
    const {user, isFetch} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!isFetch && !user){
            router.push('signInAndUp')
        }
    }, [user, isFetch, router]);

    if(isFetch) return <section className="w-full h-screen flex items-center justify-center">
        <h2 className="text-xl">Chargement en cours...</h2>
    </section>

    return children;
}

export default ProtectedRoute;