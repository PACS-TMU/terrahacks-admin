"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const supabase = createClient();

export default function CheckinButton({
    checkedIn,
    checkInData,
}: {
    checkedIn: any;
    checkInData: object;
}) {
    const [pending, setPending] = useState(false);
    const router = useRouter();

    const checkIn = async () => {
        setPending(true);
        const { data, error } = await supabase
            .from("checkin")
            .insert(checkInData)
            .select();

        if (error) {
            return router.replace(
                "/dashboard?error=Check-in failed: " + error.message
            );
        } else {
            return router.refresh();
        }
    };

    return (
        <button
            className={`border w-11/12 lg:w-1/2 px-4 py-2 rounded-md shadow-sm duration-300 ease-in-out text-2xl flex flex-row justify-center items-center ${checkedIn
                    ? "bg-red-500 text-white hover:bg-red-500 pointer-events-none line-through"
                    : "hover:bg-gray-300"
                }`}
            disabled={checkedIn !== null}
            onClick={checkIn}
        >
            {pending && <AiOutlineLoading3Quarters className="animate-spin mr-2" />}
            {pending ? "Checking in..." : checkedIn !== null ? "Checked in" : "Check in"}
        </button>
    );
}
