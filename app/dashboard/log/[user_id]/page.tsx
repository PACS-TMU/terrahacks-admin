import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import Intro from "@/components/intro";
import CheckIn from "@/components/check-in/checkin";
import MealButton from "@/components/meals/meal-button";
import Meals from "@/components/meals/meals";

export default async function LogPage({ params }: { params: { user_id: string } }) {
    // Create a Supabase client
    const supabase = createClient();

    // Get the logged in Admin user
    const { data: admin, error: adminRetrievalError } = await supabase.auth.getUser();
    if (adminRetrievalError) {
        return redirect('/?error=Unable to retrieve Admin User.')
    }
    if (!admin) {
        return redirect('/?error=Unauthorized. Log in with Admin credentials.')
    }

    // Get the Admin data
    const { data: adminData, error: adminIdRetrievalError } = await supabase.from('admins').select('*').eq('account_id', admin.user?.id).single();
    if (adminIdRetrievalError) {
        return redirect('/?error=Unable to retrieve Admin ID.')
    }

    // Get the user's data that the admin is checking
    const { data: user, error: userRetrievalError } = await supabase.from('users').select('id, applicant_details(application_id, first_name, last_name)').eq('id', params.user_id).single();
    if (userRetrievalError) {
        return redirect("/dashboard?error=Unable to retrieve User Data.");
    }
    if (!user) {
        return redirect("/dashboard?error=User not found.");
    }

    // Get whether the user is checked in
    const { data: checkedIn, error: checkedInRetrievalError } = await supabase.from('checkin').select('*').eq('account_id', params.user_id).single();
    if (checkedInRetrievalError && checkedInRetrievalError.code !== "PGRST116") {
        return redirect('/?error=Unable to retrieve Check-In Data.')
    }

    // Create a check-in data object
    const checkInData = {
        account_id: user.id,
        admin_id: adminData?.admin_id,
        application_id: user.applicant_details[0].application_id,
    }

    // Get the user's meals
    const { data: meals, error: mealsRetrievalError } = await supabase.from('meals').select('*').eq('account_id', user.id).order('meal_no', { ascending: true })
    if (mealsRetrievalError) {
        return redirect('/?error=Unable to retrieve Meal Data.')
    }

    return (
        <>
            <Intro
                header={'Log'}
                description={'This is where admins log user activity.'}
            />

            <div className={'container flex flex-col justify-center items-center gap-4 min-h-[50vh]'}>

                <h1 className={'text-center lg:w-1/2 text-2xl pt-4 my-1 font-semibold'}>
                    {`Applicant Name: ${user.applicant_details[0].first_name} ${user.applicant_details[0].last_name}`}
                </h1>
                <h2 className={'text-center lg:w-1/2 text-xl my-1'}>
                    {`User ID: ${user.id}`}
                </h2>
                <h2 className={'text-center lg:w-1/2 text-xl my-1 pb-8'}>
                    {`Application ID: ${user.applicant_details[0].application_id}`}
                </h2>

                <CheckIn
                    user_id={params.user_id}
                    checkedIn={checkedIn}
                    checkInData={checkInData}
                />

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 text-xl my-4">
                    <Meals
                        admin_id={adminData?.admin_id}
                        user={user}
                    />
                </div>

            </div>
        </>
    );
}