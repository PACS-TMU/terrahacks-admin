"use client";
import { useRouter } from "next/navigation";
import { PiSignOut } from "react-icons/pi";
import { useState } from "react";

export default function NavSignoutButton() {
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      const response = await fetch('/api/signout', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          router.push('/login');
        } else {
          console.error('Failed to sign out');
        }
      } else {
        console.error('Failed to sign out');
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <button onClick={handleSignOut} className="flex items-center justify-start p-4 gap-2 text-lg md:text-xl text-background hover:bg-background hover:text-foreground ease-in-out duration-300 rounded-md w-full mb-5">
      <PiSignOut size={32} />
      {signingOut ? 'Signing out...' : 'Sign out'}
    </button>
  );
}