import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Intro from "@/components/intro";

export default async function Teams() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return redirect("/?error=Unauthorized. Log in with Admin credentials.");
    }
    const { data: teams, error: teamsError } = await supabase
        .from("teams")
        .select("*")
        .order("created_at", { ascending: true });

    if (teamsError) {
        return redirect(`/dashboard/teams?error=teams-fetch-error: ${teamsError.message}`);
    }
    return (
        <>
            <Intro
                header="Manage Teams"
                description="Overall view of all teams for TerraHacks."
            />
            <h3 className="text-center py-4 text-2xl xl:text-3xl font-semibold">Total Teams: {teams.length}</h3>
            <div className="flex min-h-[50vh] items-center justify-center text-xl font-semibold">
                {teams.length > 0 ? (
                    <div className="w-full flex justify-center items-center p-4 mx-auto">
                        <ul className="w-full max-w-3xl space-y-6">
                            {teams.map((team) => (
                                <li
                                    key={team.team_id}
                                    className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center justify-between border border-gray-200 w-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                                >
                                    <Link
                                        href={`/dashboard/teams/${team.team_id}`}
                                        className="w-full h-full"
                                    >
                                        <span className="font-bold text-lg text-gray-800">{team.team_name}</span>
                                        <div className="text-sm text-gray-500 mt-1">
                                            Created by <span className="font-medium">{team.created_by}</span>
                                        </div>
                                        <div className="text-xs text-gray-400 mt-2 md:mt-0 md:ml-4">
                                            Created date: {new Date(team.created_at).toLocaleString()}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No teams found.</p>
                )}
            </div>
        </>
    );
}