// "use server";
import { Metadata } from 'next';
import UserDetails from "./user-details";
import Intro from "@/components/intro";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'TerraHacks Admin - Review',
};

export default async function Page({ params }: { params: { user_id: string } }) {
    // Create a client and check if user is logged in
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/?error=Unauthorized. Log in with Admin credentials.")
    }

    // Fetch volunteer application details
    const { data: fetchedData, error: detailsError } = await supabase.from('volunteer_applications')
        .select(`
            *
        `)
        .eq('account_id', params.user_id)
        .single();
    
    // Redirect if there is an error
    if (detailsError) {
        return redirect(`/dashboard/volunteer-applications/${params.user_id}?error=details-fetch-error: ${detailsError.message}`);
    }

    // Redirect if user details are not found
    if (!fetchedData) {
        return redirect(`/dashboard/volunteer-applications/${params.user_id}?error=user-details-not-found`);
    }

    return (
        <>
            <Intro
                header="Review Volunteer Application"
                description="View all details submitted by the volunteer."
            />
            <UserDetails 
                fetchedData={fetchedData} 
            />
        </>
    )
}
