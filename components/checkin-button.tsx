'use client';
import {createClient} from "@/utils/supabase/client";

const supabase = createClient();

export default function CheckinButton({checkedIn, checkInData}: {checkedIn: any, checkInData: object}){
    const checkIn = async () => {
        const {data, error} = await supabase.from('checkin').insert(checkInData).select();
        if (error) {
            console.error(error);
        } else {
            console.log(data);
        }
        console.log(checkInData)
    }
    return (
        <button className={'border w-1/2'} disabled={checkedIn !== null} onClick={checkIn}>{checkedIn !== null ? 'Checked in' : 'Check in'}</button>
    );
}