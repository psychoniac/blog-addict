import { Button } from "@/components/ui/button";

export default function PageSignInAndUp() {
  return (
    <section className="w-full h-screen flex items-center justify-center flex-col gap-2">
        <Button type="button" variant="outline">
            Continuez avec Google
        </Button>
        <Button type="button" variant="outline">
            Continuez avec Github
        </Button>
    </section>
  )
}
