'use client';

import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

// Placeholder: Replace with actual session logic from NextAuth
const useSession = () => ({ data: null, status: 'unauthenticated' }); // Mock session state


export function AuthButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignIn = () => {
    // In a real app, this would likely redirect to the sign-in page
    // or trigger the NextAuth signIn() function.
    router.push('/signin');
  };

  const handleSignOut = () => {
    // In a real app, this would trigger the NextAuth signOut() function.
    alert("Sign out functionality requires NextAuth setup.");
  };

  if (status === 'loading') {
    return <Button variant="ghost" size="icon" disabled><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div></Button>;
  }

  if (session) {
    return (
      <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sign Out">
        <LogOut size={20} />
        <span className="sr-only">Sign Out</span>
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleSignIn} title="Sign In">
      <LogIn size={20} />
      <span className="sr-only">Sign In</span>
    </Button>
  );
}
