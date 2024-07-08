import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MessageAcceptor from "@/components/message-acceptor";
import Intro from "@/components/intro";

export default async function Dashboard() {

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/?error=Unauthorized. Log in with Admin credentials.")
    }

    return (
        <>
            <Intro
                header="Admin Dashboard"
                description="Welcome to the admin dashboard. Below are some statistics and actions you can take."
            />
            <section className={'min-h-screen flex flex-col items-center'}>
            </section>
        </>

    )
}