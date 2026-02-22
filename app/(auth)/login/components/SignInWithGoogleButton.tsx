"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth-action";

export function SignInWithGoogleButton() {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => signInWithGoogle()}
    >
      Login with Google
    </Button>
  );
}
