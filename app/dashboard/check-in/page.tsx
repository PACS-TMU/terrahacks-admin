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
        checkin (
            checkin_time,
            admin_id
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
            return redirect(`/dashboard?error=${dataError.message}`);
        }

        // Promise to fetch admin's first name for each checked-in participant
        const applicationsWithAdminName = await Promise.all(applications.map(async (application: any) => {
            if (application.checkin && application.checkin.length > 0) {
                const { data: adminData, error: adminError } = await supabase
                    .from('admins')
                    .select('first_name, last_name')
                    .eq('admin_id', application.checkin[0].admin_id) 
                    .single();
        
                if (!adminError && adminData) {
                    application.admin = {
                        first_name: adminData.first_name,
                        last_name: adminData.last_name
                    }
                }
            }
            return application;
        }));
        
        // Filter out entries where applicant_details is null
        return applicationsWithAdminName.filter(application => 'applicant_details' in application && application.applicant_details !== null);
    };
    
    returnData = await fetchApplications(searchColumn, searchValue);
    console.log(returnData);

    return (
        <>
            <Intro
               header="Event Check-In"
               description="Manage event check-ins for participants. Verify the status of each participant and confirm their attendance."
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
