import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export default async function LogPage({params}: { params: { user_id: string } }) {
    const supabase = createClient();
    const {data: {user}} = await supabase.auth.getUser();
    if (!user) {
        return redirect('/login')
    }
    return (
        <div>
            <h1>{params.user_id}</h1>
        </div>
    );
}