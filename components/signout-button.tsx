"use client";
import {SubmitButton} from "@/components/submit-button";
import {createClient} from "@/utils/supabase/client";
import {useRouter, usePathname} from "next/navigation";


export default function SignOutButton() {
    const router = useRouter();
    const pathname = usePathname();

    const signout = async () => {
        const supabase = createClient();
        const {error} = await supabase.auth.signOut();
        if (error) {
            return router.replace(`${pathname}?error=${error.message}`)
        }
        return router.replace(`/?message=Signed out successfully.`)
    }
    return (
        <SubmitButton onClick={signout} pendingText={'Signing out..'}>Sign out</SubmitButton>
    )
}