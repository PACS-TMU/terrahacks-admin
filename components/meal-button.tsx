'use client';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const supabase = createClient();

export default function MealButton({ mealNumber, meal_id, mealTaken, admin_id }: {
    mealNumber: number,
    meal_id: string,
    mealTaken: boolean,
    admin_id: string
}
) {
    const router = useRouter();

    const takeMeal = async () => {
        const { data, error } = await supabase.from('meals').update({
            meal_taken: true,
            admin_id: admin_id
        }).eq('meal_id', meal_id).select();

        if (error) {
            console.error(error);
        } else {
            console.log(data);
            return router.refresh()
        }
    }
    console.log(mealTaken)

    return (
        <button
            disabled={mealTaken}
            onClick={takeMeal}
            className={'border w-1/2'}
        >
            {mealTaken ? `Meal ${mealNumber} Taken` : `Take Meal ${mealNumber}`}
        </button>
    )
}