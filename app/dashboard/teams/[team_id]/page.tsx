'use server';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function TeamPage({ params }: { params: { team_id: string } }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/?error=Unauthorized. Log in with Admin credentials.");
    }
    const { data: team, error: teamError } = await supabase
        .from("teams")
        .select("*, applicant_details!inner(first_name, last_name)")
        .eq("team_id", params.team_id)
        .single();

    const { data: teamMembers, error: teamMembersError } = await supabase
        .from("team_members")
        .select("*, applicant_details!inner(first_name, last_name, email, account_id)")
        .eq("team_id", params.team_id)

    console.log(team);
    console.log(teamMembers);

    return (
        <>
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">{team?.team_name}</h2>
                <p className="">Created by: {team?.applicant_details.first_name} {team?.applicant_details.last_name}</p>
                <p className="mb-4">Created at: {new Date(team?.created_at).toLocaleString()}</p>
                <h3 className="text-xl font-semibold mb-2">Team Members</h3>
                {teamMembers && teamMembers.length > 0 ? (
                    <ul className="space-y-4">
                        {teamMembers.map((member) => (
                            <li key={member.account_id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
                                <div>
                                    <p>{member.applicant_details.first_name} {member.applicant_details.last_name}</p>
                                    <p>{member.applicant_details.email}</p>
                                    <p>Joined at: {new Date(member.joined_at).toLocaleString()}</p>
                                </div>
                                <Link href={`/dashboard/applications/${member.applicant_details.account_id}`} className="text-blue-500 hover:underline">
                                    View Application
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No team members found.</p>
                )}
            </div>
        </>
    );
}