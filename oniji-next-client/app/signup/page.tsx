"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { useMutation } from "@apollo/client";
import { SIGNUP_BY_EMAIL } from "@/lib/gql";

export default function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const [signupByEmail, { loading, error }] = useMutation(SIGNUP_BY_EMAIL);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, [router]);

  const handleSignup = async () => {
    setErrorMessage("");

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("First name and last name cannot be empty.");
      return;
    }

    try {
      const { data } = await signupByEmail({
        variables: {
          input: {
            email,
            password,
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (data.ONIJI_SignupByEmail.error_code) {
        console.error(data.ONIJI_SignupByEmail.error_message);
        setErrorMessage(data.ONIJI_SignupByEmail.error_message);
      } else {
        console.log("Signup successful:", data.ONIJI_SignupByEmail.user);

        localStorage.setItem("token", data.ONIJI_SignupByEmail.user.token);
        localStorage.setItem("refreshToken", data.ONIJI_SignupByEmail.user.refresh_token);

        router.push("/dashboard");
      }
    } catch (e) {
      console.error("Error during signup:", e);
      setErrorMessage("An error occurred during signup.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <Button
              type="submit"
              className="w-full"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
