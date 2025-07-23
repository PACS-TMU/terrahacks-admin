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
        volunteer_id,
        account_id,
        first_name,
        last_name,
        email,
        applied_date,
        status
    `;
    if (searchColumn) {
        const { data: applications, error: dataError } = await supabase.from('volunteer_applications').select(selectQuery)
            .order('status', { ascending: true })
            .order('applied_date', { ascending: true })
            .ilike(`${searchColumn}`, `%${searchValue!}%`);

        if (dataError) {
            return redirect(`/dashboard/volunteer-applications?error=${dataError.message}`);
        }
        returnData = applications;
    } else {
        const { data: applications, error: dataError } = await supabase.from('volunteer_applications').select(selectQuery)
            .order('status', { ascending: true })
            .order('applied_date', { ascending: true });

        if (dataError) {
            return redirect(`/dashboard/volunteer-applications?error=${dataError.message}`);
        }
        returnData = applications;
    }

    return (
        <>
            <Intro
                header="Volunteer Applications"
                description="View all volunteer applications submitted. You can view the status of each application and the applicant's details."
            />
            <Search placeholder="Search volunteer applications by name, email, or status..." />
            {returnData.length === 0 ? (
                <div className="container mx-auto mt-6 text-center text-gray-500">
                    No volunteer applications found.
                </div>
            ) : (
                <div className="container mx-auto pt-6 pb-10">
                    <DataTable columns={columns} data={returnData} />
                </div>
            )}
        </>
    );
}
