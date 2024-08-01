import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/db/configFirebase";
import Link from "next/link";
import { LogOut, Settings, Plus } from "lucide-react";


export default function DashboardNav() {
    const router = useRouter();

    const handleSignOut = () => {
        signOut(auth);
        router.push('/');

    }


    return (
    <div>
      
    </div>
  )
}
