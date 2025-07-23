"use server";
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function handleStatusUpdate(formData: FormData) {
    const supabase = createClient();
    const applicant_id = formData.get('user_id');
    const application_id = formData.get('application_id');
    const current_status = formData.get('currentStatus');
    const new_status = formData.get('newStatus');

    // If status is not changed, return
    if (current_status === new_status) {
        return redirect(`/dashboard/volunteer-applications/${applicant_id}?error=You did not edit the application status.`);
    }

    // Fetch admin details
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return redirect("/?error=Unauthorized. Log in with Admin credentials.")
    }

    const {data: adminDetails, error: adminError} = await supabase.from('admins').select('admin_id').eq('account_id', user.id).single();
    if (adminError) {
        return redirect(`/dashboard/volunteer-applications/${applicant_id}?error=admin-fetch-error: ${adminError.message}`);
    }

    // Update application status
    const { data: updatedApplication, error: updateError } = await supabase.from('volunteer_applications').update({ status: new_status }).eq('volunteer_id', application_id);
    if (updateError) {
        return redirect(`/dashboard/volunteer-applications/${applicant_id}?error=application-update-error: ${updateError.message}`);
    }

    return redirect(`/dashboard/volunteer-applications/${applicant_id}?message=Application status updated successfully.`);
};