'use client';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const supabase = createClient();

export default function MealButton({ mealNumber, meal_id, mealTaken, admin_id }: {
    mealNumber: number,
    meal_id: string,
    mealTaken: boolean,
    admin_id: string
}
) {
    const router = useRouter();

    const [pending, setPending] = useState(false);

    const takeMeal = async () => {
        setPending(true);
        const now = new Date();
        now.setHours(now.getHours() - 4); // Subtract 4 hours
        const timestamp = now.toISOString().replace('T', ' ').replace('Z', '');

        const { data, error } = await supabase.from('meals').update({
            meal_taken: true,
            admin_id: admin_id,
            meal_time: timestamp
        }).eq('meal_id', meal_id).select();

        if (error) {
            setPending(false);
            return router.replace('/dashboard?error=Error taking meal: ' + error.message);
        } else {
            setPending(false);
            return router.refresh()
        }

    }

    return (
        <button
            disabled={mealTaken}
            onClick={takeMeal}
            className={`border w-full px-4 py-2 rounded-md shadow-sm duration-300 ease-in-out ${mealTaken ? 'bg-red-500 text-white line-through' : 'hover:bg-gray-300'}`}
        >
            {pending ? 'Taking Meal...' : mealTaken ? `Meal ${mealNumber} Taken` : `Take Meal ${mealNumber}`}
        </button>
    )
}