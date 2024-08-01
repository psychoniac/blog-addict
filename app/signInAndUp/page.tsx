"use client"

import { Button } from "@/components/ui/button";
import useAuth from '@/hooks/useAuth';

export default function PageSignInAndUp() {
  
  const {redirectIfAuthenticated, loginWithGoogle, loginWithGithub} = useAuth();
  
  redirectIfAuthenticated();


  return (
    <section className="w-full h-screen flex items-center justify-center flex-col gap-2">
        <Button type="button" variant="outline" onClick={loginWithGoogle}>
            Continuez avec Google
        </Button>
        <Button type="button" variant="outline" onClick={loginWithGithub}>
            Continuez avec Github
        </Button>
    </section>
  )
}
