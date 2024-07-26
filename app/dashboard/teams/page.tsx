import Intro from "@/components/intro";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Teams() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/?error=Unauthorized. Log in with Admin credentials.");
    }

    return (
        <>
            <Intro 
                header="Manage Teams"
                description="This feature is not implemented for TerraHacks 2024. Will be available in the future." 
            />
            <div className="flex min-h-[50vh] items-center justify-center text-xl font-semibold">
                <p>Feature not implemented...</p>
            </div>
        </>
    )
}