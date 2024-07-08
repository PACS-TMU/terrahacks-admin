'use server';
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export default async function login(formData: FormData) {
    const credentials = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    }

    const supabase = createClient();
    const {data: {user}, error} = await supabase.auth.signInWithPassword(credentials);

    if (error) {
        return redirect(`/?error=${error.message}`)
    } else {
        const {data: adminUser, error: dbError} = await supabase.from('admin').select().eq('account_id', user?.id).single();
        if (dbError && dbError.code === "PGRST116") { // User is not in Admin table
            await supabase.auth.signOut();
            return redirect(`/?error=Unauthorized. Log in with Admin credentials.`)
        }
        else if (dbError) { // Other DB error
            await supabase.auth.signOut();
            return redirect(`/?error=${dbError.message}`)
        }
        else { // User is in Admin table
            if (!adminUser) {
                await supabase.auth.signOut();
                return redirect(`/?error=Unauthorized. Edge case: Admin user not found. Report to PACS`)
            }
        }
        return redirect("/dashboard?message=Signed in successfully.");
    }
}