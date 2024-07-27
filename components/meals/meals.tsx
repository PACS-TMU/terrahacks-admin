import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MealButton from "@/components/meals/meal-button";


export default async function Meals({ admin_id, user }: { admin_id: string, user: any }) {
    const supabase = createClient();
    // Get the user's meals
    const { data: meals, error: mealsRetrievalError } = await supabase
        .from("meals")
        .select("*")
        .eq("account_id", user.id)
        .order("meal_no", { ascending: true });
    if (mealsRetrievalError) {
        return redirect("/dashboard?error=Unable to retrieve Meal Data.");
    }

    return (
        <>
            {
                [1, 2, 3, 4, 5].map(async (meal) => {
                    // Get the meals data
                    const { data: mealData, error: mealRetrievalError } = await supabase
                        .from("meals")
                        .select("admin_id, meal_time")
                        .eq("account_id", user.id)
                        .eq("meal_no", meal)
                        .single();
                    if (mealRetrievalError) {
                        return redirect("/dashboard?error=Unable to retrieve Meal Data.");
                    }

                    // If no admin has checked in the meal
                    if (!mealData.admin_id) {
                        return (
                            <MealButton
                                key={meal}
                                mealNumber={meal}
                                meal_id={meals![meal - 1].meal_id}
                                mealTaken={meals![meal - 1].meal_taken}
                                admin_id={admin_id}
                            />
                        );
                    }

                    const mealTime = new Date(mealData.meal_time).toLocaleString([], { hour12: false });

                    // Get the admin data
                    const { data: admin, error: adminError } = await supabase
                        .from("admins")
                        .select("*")
                        .eq("admin_id", mealData.admin_id)
                        .single();
                    if (adminError) {
                        return redirect("/dashboard?error=Unable to retrieve Admin Data.");
                    }

                    return (
                        <div className="flex flex-col items-center justify-center text-sm space-x-4">
                            <MealButton
                                key={meal}
                                mealNumber={meal}
                                meal_id={meals![meal - 1].meal_id}
                                mealTaken={meals![meal - 1].meal_taken}
                                admin_id={admin_id}
                            />
                            <p className='text-left w-full mx-2'>
                                Meal completed by: <span className='font-mono font-semibold'>{admin.first_name} {admin.last_name}</span>
                            </p>
                            <p className='text-left w-full mx-2'>
                                Meal taken at: <span className='font-mono font-semibold'>{mealTime}</span>
                            </p>
                        </div>
                    );
                })
            }
        </>
    )
}
