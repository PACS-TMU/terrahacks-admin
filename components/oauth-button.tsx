'use client';
import {createClient} from "@/utils/supabase/client";

import {Button} from "@/components/ui/button";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {redirect} from "next/navigation";

export default function OAuthButton({provider, className}: { provider: 'google' | 'github', className?: string}) {

    const signIn = async () => {
        const supabase = createClient();
        const {error} = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: `${origin}/auth/callback`
            }
        })
        if (error) {
            return redirect(`/?error=${error.message}`)
        }
    }

    return (
        <Button variant={'outline'} className={className} onClick={signIn}>
            {provider === 'google' ? <FcGoogle className={'mr-2'}size={'20px'}/> : <FaGithub className={'mr-2'}size={'20px'}/>}
            {provider === 'google' ? 'Continue with Google' : 'Continue with GitHub'}
        </Button>
    )
}