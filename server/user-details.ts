"use server";
import { createClient } from "@/utils/supabase/server";

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

export default async function getUserDetails(user_id: string) {
    // Create a client
    const supabase = createClient();


    // Fetch user details
    // const fetchedDetails: UserDetails = {};

    const { data: fetchedDetails, error: detailsError } = await supabase.from('applications').select().eq('application_id', user_id);

    return { fetchedDetails, detailsError };
}