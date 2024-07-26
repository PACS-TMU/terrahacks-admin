import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import Intro from "@/components/intro";
import CheckinButton from "@/components/checkin-button";
import MealButton from "@/components/meal-button";

export default async function LogPage({ params }: { params: { user_id: string } }) {
    const supabase = createClient();

    const { data: admin } = await supabase.auth.getUser();
    if (!admin) {
        return redirect('/?error=Unauthorized. Log in with Admin credentials.')
    }

    const { data: admin_id } = await supabase.from('admins').select('admin_id').eq('account_id', admin.user?.id).single();
    const { data: user } = await supabase.from('users').select('id, applicant_details(application_id, first_name, last_name)').eq('id', params.user_id).single();
    if (!user) {
        return redirect("/dashboard?error=User not found.");
    }

    const { data: checkedIn } = await supabase.from('checkin').select('id').eq('user_id', params.user_id).single();
    console.log(checkedIn)
    
    const checkInData = {
        account_id: user.id,
        admin_id: admin_id?.admin_id,
        application_id: user.applicant_details[0].application_id,
    }

    const { data: meals } = await supabase.from('meals').select('*').eq('account_id', user.id).order('meal_no', { ascending: true })

    return (
        <div>
            <Intro header={'Log'} description={'This is where admins log user activity.'} />
            <div className={'container flex flex-col items-center gap-4'}>
                <h1 className={'text-center w-1/2'}>
                    {`Name: ${user.applicant_details[0].first_name} ${user.applicant_details[0].last_name}`}
                </h1>

                <CheckinButton
                    checkedIn={checkedIn}
                    checkInData={checkInData}
                />

                {[1, 2, 3, 4, 5].map((meal) => {
                    return (
                        <MealButton
                            key={meal}
                            mealNumber={meal}
                            meal_id={meals![meal - 1].meal_id}
                            mealTaken={meals![meal - 1].meal_taken}
                            admin_id={admin_id?.admin_id}
                        />
                    )
                })}
            </div>
        </div>
    );
}