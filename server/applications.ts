'use server';
import { createAdminClient } from '@/utils/supabase/admin';
import {redirect} from "next/navigation";

export default async function applicationsRender() {
    const supabase = createAdminClient();

    // List all users with the auth admin api
    const { data, error } = await supabase.auth.admin.listUsers();
    console.log(data);
    
    return data;

}