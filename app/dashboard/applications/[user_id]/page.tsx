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

    // Fetch user details
    const { data: fetchedData, error: detailsError } = await supabase.from('applicant_details')
        .select(`
            account_id, 
            first_name, 
            last_name, 
            email, 
            application_id, 
            tmu_student, 
            accommodation, 
            github, 
            linkedin, 
            dietary_restrictions, 
            grad_year, 
            city, 
            province_state, 
            country, 
            school, 
            field_of_study, 
            level_of_study,
            applications!inner(applied_date, status)
        `)
        .eq('account_id', params.user_id)
        .single();
    
    // Redirect if there is an error
    if (detailsError) {
        return redirect(`/dashboard/applications/${params.user_id}?error=details-fetch-error: ${detailsError.message}`);
    }

    // Redirect if user details are not found
    if (!fetchedData) {
        return redirect(`/dashboard/applications/${params.user_id}?error=user-details-not-found`);
    }

    // Check tmu_student
    let tmuStudentNum = null;
    if (fetchedData.tmu_student) {
        const { data: tmuStudentData, error: tmuStudentError } = await supabase.from('tmu_students').select('student_num').eq('account_id', params.user_id).single();
        if (tmuStudentError) {
            return redirect(`/dashboard/applications/${params.user_id}?error=tmu-student-fetch-error: ${tmuStudentError.message}`);
        }
        tmuStudentNum = tmuStudentData.student_num;
    }

    // Check accommodation
    let accommodationData = null;
    if (fetchedData.accommodation) {
        const { data: accommodation, error: accommodationError } = await supabase.from('accommodations').select().eq('account_id', params.user_id).single();
        if (accommodationError) {
            return redirect(`/dashboard/applications/${params.user_id}?error=accommodation-fetch-error: ${accommodationError.message}`);
        }
        accommodationData = accommodation;
    }

    // Fetch questions
    const { data: questions, error: questionsError } = await supabase.from('questions').select();

    // Redirect if there is an error
    if (questionsError) {
        return redirect(`/dashboard/applications/${params.user_id}?error=questions-fetch-error: ${questionsError.message}`);
    }

    // Fetch user responses
    const { data: responses, error: responsesError } = await supabase.from('responses')
        .select('question_id, response')
        .eq('account_id', params.user_id);

    // Redirect if there is an error
    if (responsesError) {
        return redirect(`/dashboard/applications/${params.user_id}?error=responses-fetch-error: ${responsesError.message}`);
    }

    // Fetch admin logs of this application
    let adminLogs: any[] = [];
    const { data: fetchedAdminLogs, error: adminLogsError } = await supabase.from('admin_logs')
        .select('timestamp, previous_status, new_status, admin_id, admins!inner(first_name, last_name)')
        .eq('application_id', fetchedData.application_id)
        .order('timestamp', { ascending: false });
    
    // Redirect if there is an error
    if (adminLogsError) {
        return redirect(`/dashboard/applications/${params.user_id}?error=admin-logs-fetch-error: ${adminLogsError.message}`);
    }

    if (fetchedAdminLogs) {
        adminLogs = fetchedAdminLogs;
    }

    return (
        <>
            <Intro
                header="Review User Applications"
                description="View the application details that a user submitted. Update the status after reviewing. Please note that the user's details are confidential and should not be shared with anyone."
            />
            <UserDetails 
                user_id={params.user_id} 
                userData={fetchedData} 
                appQuestions={questions} 
                appResponses={responses} 
                tmuStudentNum={tmuStudentNum} 
                accommodation={accommodationData} 
                adminLogs={adminLogs}
            />
        </>
    )
}