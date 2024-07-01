import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import MessageAcceptor from "@/components/message-acceptor";
import {SubmitButton} from "@/components/submit-button";

import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import OAuthButton from "@/components/oauth-button";

export default async function Login() {

    const supabase = createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if (user) {
        return redirect("/")
    }

    const login = async (formData: FormData) => {
        'use server';
        const credentials = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }
        const supabase = createClient();
        const {data, error} = await supabase.auth.signInWithPassword(credentials);
        if (error) {
            return redirect(`/login?error=${error.message}`)
        } else {
            return redirect(`/?message=Logged in successfully!`)
        }
    }

    return (
        <Card className="w-full max-w-md my-auto">
            <CardHeader className={'space-y-1'}>
                <CardTitle className="text-2xl">TerraHacks Admin Login</CardTitle>
                <CardDescription>Enter your admin credentials.</CardDescription>
            </CardHeader>
            <form id={'login'}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input name={'email'} id="email" type="email" placeholder="admin@terrahacks.ca" required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input name={'password'} id="password" type="password" required placeholder={"•••••••••"}/>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-4">
                    <SubmitButton type={'submit'} className={'w-full'} form={'login'} formAction={login}
                                  pendingText={'Signing in...'}>
                        Sign in
                    </SubmitButton>
                </CardFooter>
            </form>
            <CardFooter className={'flex flex-col items-center gap-4'}>
                <OAuthButton className={'w-full'} provider={'google'}/>
                <OAuthButton className={'w-full'} provider={'github'}/>
            </CardFooter>
            <MessageAcceptor/>
        </Card>
    )
}