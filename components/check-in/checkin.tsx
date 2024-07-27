import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import CheckinButton from './checkin-button';

export default async function CheckIn({ user_id, checkedIn, checkInData }: { user_id: string, checkedIn: any, checkInData: object }) {
    const supabase = createClient();

    const { data: checkedInAdmin, error } = await supabase.from('checkin').select('admin_id').eq('account_id', user_id).single();
    if (error && error.code === "PGRST116") {
        return (
            <>
                <CheckinButton
                    checkedIn={checkedIn}
                    checkInData={checkInData}
                />
                <p className='text-left w-1/2 px-2'>Not checked in yet!</p>
            </>
        );
    }
    else if (error) {
        console.error(error);
        return redirect('/dashboard?error=Error retrieving admin: ' + error.message);
    }

    const { data: admin, error: adminError } = await supabase.from('admins').select('*').eq('admin_id', checkedInAdmin.admin_id).single();
    if (adminError) {
        console.error(adminError);
        return redirect('/dashboard?error=Error retrieving admin: ' + adminError.message);
    }

    const checkInTime = new Date(checkedIn.checkin_time).toLocaleString([], { hour12: false });

    return (
        <div className='flex flex-col items-center justify-center w-full mx-auto'>
            <CheckinButton
                checkedIn={checkedIn}
                checkInData={checkInData}
            />
            <p className='text-left lg:w-1/2 px-2'>
                Checked in by: <span className='font-mono font-semibold'>{admin.first_name} {admin.last_name}</span>
            </p>
            <p className='text-left lg:w-1/2 px-2'>
                Checked in at: <span className='font-mono font-semibold'>{checkInTime}</span>
            </p>
        </div>
    )
}