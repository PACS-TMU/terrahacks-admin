'use server';
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export default async function applicationsRender() {
    const supabase = createClient();

    // List all applications data needed from both applications and applicant_details tables
    const { data: applicationsData, error: dataError } = await supabase.from('applications').select(`
        account_id,
        applied_date,
        status,
        applicant_details (
            email,
            first_name,
            last_name
        )
        `).order('applied_date', { ascending: true });

    
    if (dataError) {
        return null;
    }
    
    return applicationsData;
}