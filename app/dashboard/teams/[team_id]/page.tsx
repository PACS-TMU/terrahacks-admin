"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import Link from "next/link";
import Intro from "@/components/intro";

interface TeamMember {
    application_id: string;
    team_id: string;
    joined_at: string;
}

export default function Teams({ params }: { params: { team_id: string } }) {
    const [members, setMembers] = useState<TeamMember[]>([]);

    useEffect(() => {
        const fetchMembers = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                redirect("/?error=Unauthorized. Log in with Admin credentials.");
            }

            const { data: membersData, error: membersError } = await supabase
                .from("team_members")
                .select("*, teams(team_id, team_name, created_by)")
                .order("created_at", { ascending: false })
                .eq("team_members.team_id", params.team_id);

            if (membersError) {
                console.error("Error fetching team members:", membersError);
                return redirect("/dashboard/teams?error=Failed to fetch team members.");
            }

            console.log("Fetched members:", membersData);

            setMembers(membersData ?? []);
        };
        fetchMembers();
    }, []);

    if (!members) {
        return redirect("/?error=Unauthorized. Log in with Admin credentials.");
    }
    return (
        <>
            <Intro
                header="Manage Teams"
                description="View the team members in each team."
            />
            <h3 className="text-center py-4 text-2xl xl:text-3xl font-semibold">Total Team Members: {members.length}</h3>
        </>
    )
}