'use server';
import {columns} from './columns';
import {DataTable} from './data-table';
import Intro from '@/components/intro';
import {redirect} from "next/navigation";
import {createClient} from "@/utils/supabase/server";

export default async function Applications() {
    const supabase = createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if (!user) {
        return redirect("/?error=Unauthorized. Log in with Admin credentials.")
    }

    const {data: applications, error: dataError} = await supabase.from('applications').select(`
            account_id,
            applied_date,
            status,
            applicant_details (
                email,
                first_name,
                last_name
            ),
            users!inner(applied)
        `)
        .eq('users.applied', 'Applied')
        .order('status', {ascending: true})
        .order('applied_date', {ascending: true});

    if (dataError) {
        return redirect(`/dashboard/applications?error=${dataError.message}`);
    }

    return (
        <>
            <Intro
                header="Applications"
                description="View all applications submitted by participants. You can view the status of each application and the applicant's details."
            />
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={applications}/>
            </div>
        </>
    );
}