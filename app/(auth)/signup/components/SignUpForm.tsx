"use client";

import { useActionState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/auth-action";

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(signup, null);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl font-serif">Create an account</CardTitle>
        <CardDescription>
          It only takes a moment to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  name="first-name"
                  id="first-name"
                  placeholder="Max"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  name="last-name"
                  id="last-name"
                  placeholder="Robinson"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input name="password" id="password" type="password" required />
            </div>
            {state?.error && (
              <p className="text-sm text-red-600">{state.error}</p>
            )}
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Creating account…" : "Create an account"}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
