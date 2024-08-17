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
import { LOGIN_BY_EMAIL } from "@/lib/gql";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const [loginByEmail, { loading, error }] = useMutation(LOGIN_BY_EMAIL);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, [router]);

  const handleLogin = async () => {
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Email and password cannot be empty.");
      return;
    }

    try {
      const { data } = await loginByEmail({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      if (data.ONIJI_LoginByEmail.error_code) {
        console.error(data.ONIJI_LoginByEmail.error_message);
        setErrorMessage(data.ONIJI_LoginByEmail.error_message);
      } else {
        console.log("Login successful:", data.ONIJI_LoginByEmail.user);
        
        localStorage.setItem("token", data.ONIJI_LoginByEmail.user.token);
        localStorage.setItem("refreshToken", data.ONIJI_LoginByEmail.user.refresh_token);

        router.push("/");
      }
    } catch (e) {
      console.error("Error during login:", e);
      setErrorMessage("An error occurred during login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
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
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
