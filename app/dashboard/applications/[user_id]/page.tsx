// "use server";
import { Metadata } from 'next';
import UserDetails from "./user-details";
import Intro from "@/components/intro";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type UserDetails = {
    first_name: string,
    last_name: string,
    email: string,
    application_id: string,
    status: string,
    major: string,
    school: string,
    year: string,
    grad_year: string,
    city: string,
    province: string,
    country: string,
    tmuStudent: boolean,
    accomodation: boolean,
    accomodationDetails: string,
    github: string,
    linkedin: string,
    dietaryRestrictions: string,
    response1: string,
    response2: string,
}

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

    // Fetch questions
    const { data: questions, error: questionsError } = await supabase.from('questions').select();

    // Fetch user details
    // Update this to actual get all the user details
    const { data: fetchedData, error: detailsError } = await supabase.from('applications').select().eq('user_id', params.user_id).single();


    // Redirect if there is an error
    if (detailsError) {
        if (questionsError) {
            return redirect(`/dashboard/applications/${params.user_id}?error=details-fetch-error: ${detailsError.message}`);
        }
    }

    if (questionsError) {
        return redirect(`/dashboard/applications/${params.user_id}?error=questions-fetch-error: ${questionsError.message}`);
    }

    return (
        <>
            <Intro
                header="Review User Applications"
                description="View the application details that a user submitted. Update the status after reviewing. Please note that the user's details are confidential and should not be shared with anyone."
            />
            <UserDetails user_id={params.user_id} userData={fetchedData} appQuestions={questions} />
        </>
    )
}