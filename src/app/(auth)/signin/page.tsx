'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignInPage() {
  // NOTE: This is a placeholder UI. Actual sign-in requires NextAuth configuration.
  const handleSignIn = () => {
    // Placeholder action - Replace with NextAuth signIn call
    alert("Sign in functionality requires NextAuth setup.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your MyAI Pal.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleSignIn}>
            Sign In
          </Button>
           <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="#" className="underline text-primary">
              Sign up
            </Link>
             (Not Implemented)
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
