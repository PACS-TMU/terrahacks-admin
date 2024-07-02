import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import MessageAcceptor from "@/components/message-acceptor";
import SignOutButton from "@/components/signout-button";

export default async function Dashboard() {

    const supabase = createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if (!user) {
        return redirect("/?error=Unauthorized. Log in with Admin credentials.")
    }

    return (
        <section className={'min-h-screen flex flex-col items-center'}>
            Hello
            <SignOutButton />
            <MessageAcceptor />
        </section>
    )
}