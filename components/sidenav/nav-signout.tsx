"use client";
import { useRouter } from "next/navigation";
import { PiSignOut } from "react-icons/pi";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function NavSignoutButton() {
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setSigningOut(true);
    const origin = window.location.origin;
    
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) {
        router.replace(`${origin}?error=Failed to sign out. ${error.message}`);
    }

    router.replace("/?message=Signed out successfully.")
  }

  return (
    <button onClick={handleSignOut} className="flex items-center justify-start p-4 gap-2 text-lg md:text-xl text-background hover:bg-background hover:text-foreground ease-in-out duration-300 rounded-md w-full mb-5">
      <PiSignOut size={32} />
      {signingOut ? 'Signing out...' : 'Sign out'}
    </button>
  );
}