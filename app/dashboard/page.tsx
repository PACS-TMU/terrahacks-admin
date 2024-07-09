import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import Intro from "@/components/intro";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {buttonVariants} from "@/components/ui/button"


export default async function Dashboard() {

    const supabase = createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if (!user) {
        return redirect("/?error=Unauthorized. Log in with Admin credentials.")
    }

    // Applications Count
    const {count: total_users} = await supabase
        .from('users')
        .select('*', {count: 'exact', head: true})
    const {count: total_complete_applications} = await supabase
        .from('users')
        .select('*', {count: "exact", head: true}).eq('applied', 'Applied')

    // Applications Status
    const {count: applications_accepted} = await supabase
        .from('applications')
        .select('*', {count: "exact", head: true}).eq('status', 'Accepted')
    const {count: applications_rejected} = await supabase
        .from('applications')
        .select('*', {count: "exact", head: true}).eq('status', 'Rejected')
    const {count: applications_under_review} = await supabase
        .from('applications')
        .select('status, users!inner(applied)', {count: "exact", head: true})
        .eq("users.applied", "Applied")
        .eq("status", "Under Review")

    // TMU Students
    const {count: tmu_students_signups} = await supabase
        .from('tmu_students').select('*', {count: 'exact', head: true})
    const {count: tmu_students_applicants} = await supabase
        .from('tmu_students')
        .select('*, users!inner(applied)', {count: 'exact', head: true})
        .eq('users.applied', 'Applied')
    const {count: tmu_students_accepted} = await supabase
        .from('tmu_students')
        .select('*, applications!inner(status)', {count: 'exact', head: true})
        .eq('applications.status', 'Accepted')
    const {count: tmu_students_rejected} = await supabase
        .from('tmu_students')
        .select('*, applications!inner(status)', {count: 'exact', head: true})
        .eq('applications.status', 'Rejected')
    const tmu_student_percentage = ((tmu_students_applicants! / total_complete_applications!) * 100).toFixed(1)

    // Data Requests
    const {count: data_requests} = await supabase
        .from('data_request')
        .select('*', {count: "exact", head: true})
    const {count: data_requests_completed} = await supabase
        .from('data_request')
        .select('*', {count: "exact", head: true}).eq('completed', 'TRUE')

    return (
        <section>
            <Intro
                header="Admin Dashboard"
                description="Welcome to the admin dashboard. Below are some statistics and actions you can take."
            />
            <section className={'flex flex-col items-center'}>
                <Link href={'/dashboard/applications'} className={`${buttonVariants({variant: "default"})} w-1/2 mt-8 text-lg font-semibold`}>
                    Review Applications Now!!
                </Link>
                <div className={'grid grid-cols-2 w-1/2 gap-8 my-8'}>
                    <Card className={''}>
                        <CardHeader>
                            <CardTitle>Applications Count</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Total Users: {total_users}</p>
                            <p>Completed Applications: {total_complete_applications}</p>
                            <p>In Progress Applications: {total_users! - total_complete_applications!}</p>
                            {/*<p>Applicants Today: {}</p>*/}
                            {/*<p>Applicants this week: {}</p>*/}
                        </CardContent>
                    </Card>
                    <Card className={''}>
                        <CardHeader>
                            <CardTitle>Applications Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Accepted: {applications_accepted}</p>
                            <p>Rejected: {applications_rejected}</p>
                            <p>Under Review: {applications_under_review}</p>
                        </CardContent>
                    </Card>
                    <Card className={''}>
                        <CardHeader>
                            <CardTitle>TMU Students</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>TMU Student Sign Ups: {tmu_students_signups}</p>
                            <p>TMU Student Applicants: {tmu_students_applicants}</p>
                            <p>Accepted: {tmu_students_accepted}</p>
                            <p>Rejected: {tmu_students_rejected}</p>
                            <p>TMU Student Percentage: {tmu_student_percentage}%</p>
                        </CardContent>
                    </Card>
                    <Card className={''}>
                        <CardHeader>
                            <CardTitle>Data Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Data Requests: {data_requests}</p>
                            <p>Completed Data Requests: {data_requests_completed}</p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </section>

    )
}