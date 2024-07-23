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
    };
};

export default async function CheckIn({ searchParams }: ApplicationsProps) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/?error=Unauthorized. Log in with Admin credentials.");
    }

    // Determine which column to search by based on searchParams
    let searchColumn: string | undefined = undefined;
    let searchValue: string | undefined;
    if (searchParams.firstName) {
        searchColumn = 'first_name';
        searchValue = searchParams.firstName;
    } else if (searchParams.lastName) {
        searchColumn = 'last_name';
        searchValue = searchParams.lastName;
    } else if (searchParams.email) {
        searchColumn = 'email';
        searchValue = searchParams.email;
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
        meals(
            meal_no,
            meal_taken,
            meal_time
        ),
        users!inner(applied)
    `

    const fetchApplications = async (searchColumn?: string, searchValue?: string) => {
        let query = supabase.from('applications').select(selectQuery)
            .eq('status', 'Accepted')
            .order('applied_date', { ascending: true });
    
        if (searchColumn) {
            query = query.ilike(`applicant_details.${searchColumn}`, `%${searchValue!}%`);
        }
    
        const { data: applications, error: dataError } = await query;
    
        if (dataError) {
            return redirect(`/dashboard/applications?error=${dataError.message}`);
        }
    
        // Filter out entries where applicant_details is null
        return applications.filter(application => 'applicant_details' in application && application.applicant_details !== null);
    };
    
    returnData = await fetchApplications(searchColumn, searchValue);

    return (
        <>
            <Intro
               header="Meals Management"
               description="Manage meals for participants. Verify who has received their meals and who hasn't."
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
