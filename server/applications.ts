'use server';
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export default async function applicationsRender() {
    const supabase = createClient();

    // List all applications data needed from both applications and applicant_details tables
    const { data: applicationsData, error: dataError } = await supabase.from('applications').select(`
        application_id,
        account_id,
        applied_date,
        status,
        rsvp,
        applicant_details (
            email,
            first_name,
            last_name
        )
        `).neq('application_id', '536aab46-373a-42dd-85a4-10f24c5310a5') // Ignore Kai's screw up
        .order('applied_date', { ascending: true });

    
    if (dataError) {
        return null;
    }
    
    return applicationsData;
}