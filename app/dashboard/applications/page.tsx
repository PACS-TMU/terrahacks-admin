'use server';
import { columns } from './columns';
import { DataTable } from './data-table';
import Intro from '@/components/intro';
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Search from '@/components/search';

type ApplicationsProps = {
    searchParams: {
        firstName?: string;
        lastName?: string;
        email?: string;
        status?: string;
    };
};

export default async function Applications({ searchParams }: ApplicationsProps) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/?error=Unauthorized. Log in with Admin credentials.");
    }

    // Determine which column to search by based on searchParams
    let searchColumn: string | null = null;
    let searchValue: string | null;
    if (searchParams.firstName) {
        searchColumn = 'first_name';
        searchValue = searchParams.firstName;
    } else if (searchParams.lastName) {
        searchColumn = 'last_name';
        searchValue = searchParams.lastName;
    } else if (searchParams.email) {
        searchColumn = 'email';
        searchValue = searchParams.email;
    } else if (searchParams.status) {
        searchColumn = 'status';
        searchValue = searchParams.status;
    }

    let returnData: any;
    const selectQuery: string = `
        account_id,
        applied_date,
        status,
        applicant_details (
            email,
            first_name,
            last_name
        ),
        users!inner(applied)
    `
    if (searchColumn) {
        const { data: applications, error: dataError } = await supabase.from('applications').select(selectQuery)
            .eq('users.applied', 'Applied')
            .order('status', { ascending: true })
            .order('applied_date', { ascending: true })
            .ilike(`applicant_details.${searchColumn}`, `%${searchValue!}%`);
    
        if (dataError) {
            return redirect(`/dashboard/applications?error=${dataError.message}`);
        }
    
        // Filter out entries where applicant_details is null
        returnData = applications.filter(application => 'applicant_details' in application 
            && application.applicant_details !== null);
    }
    else {
        const { data: applications, error: dataError } = await supabase.from('applications').select(selectQuery)
            .eq('users.applied', 'Applied')
            .order('status', { ascending: true })
            .order('applied_date', { ascending: true });

        if (dataError) {
            return redirect(`/dashboard/applications?error=${dataError.message}`);
        }

        returnData = applications;
    }

    return (
        <>
            <Intro
                header="Applications"
                description="View all applications submitted by participants. You can view the status of each application and the applicant's details."
            />
            <Search placeholder="Search applications by name, email, or status..." />
            {returnData.length === 0 ? (
                <div className="container mx-auto mt-6 text-center text-gray-500">
                    No applications found.
                </div>
            ) : (
                <div className="container mx-auto pt-6 pb-10">
                    <DataTable columns={columns} data={returnData} />
                </div>
            )}
        </>
    );
}
