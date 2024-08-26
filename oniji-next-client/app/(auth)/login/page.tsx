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
import { LOGIN_BY_EMAIL, RESET_PASSWORD } from "@/lib/gql";

// Login Form Component
function LoginForm({ onToggleReset }: { onToggleReset: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [loginByEmail, { loading: loginLoading, error: loginError }] = useMutation(LOGIN_BY_EMAIL);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
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

      if (data?.ONIJI_LoginByEmail?.error_code) {
        setErrorMessage(data.ONIJI_LoginByEmail.error_message);
      } else {
        localStorage.setItem("token", data.ONIJI_LoginByEmail.user.token);
        localStorage.setItem("refreshToken", data.ONIJI_LoginByEmail.user.refresh_token);
        router.push("/");
      }
    } catch (e) {
      setErrorMessage("An error occurred during login.");
    }
  };

  return (
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
              <p
                className="cursor-pointer ml-auto inline-block text-sm underline"
                onClick={onToggleReset}
              >
                Reset my password
              </p>
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <div onClick={() => setShowPassword(!showPassword)}>
            <p className="cursor-pointer hover:underline text-sm">
              {showPassword ? "Hide password" : "Show password"}
            </p>
          </div>
          <Button
            type="submit"
            className="w-full"
            onClick={handleLogin}
            disabled={loginLoading}
          >
            {loginLoading ? "Logging in..." : "Login"}
          </Button>
          {loginError && (
            <p className="text-red-500 text-sm">{loginError.message}</p>
          )}
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

// Reset Password Component
function ResetPasswordForm({ onToggleReset }: { onToggleReset: () => void }) {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [resetPassword, { loading: resetLoading, error: resetError }] = useMutation(RESET_PASSWORD);

  const sendResetPassword = async () => {
    setErrorMessage("");
    setSuccess(false);

    if (!email.trim()) {
      setErrorMessage("Email cannot be empty.");
      return;
    }

    try {
      const { data } = await resetPassword({
        variables: {
          input: { 
            email,
          },
        },
      });

      if (data?.resetPassword?.error_code) {
        setErrorMessage(data.resetPassword.error_message);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      setErrorMessage("An error occurred during reset.");
    }
  };

  return (
    <div className="grid gap-4 max-w-sm">
      <Label htmlFor="email">
        Please enter the email that you registered with
      </Label>
      <Input
        id="email"
        type="email"
        placeholder="m@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button
        className="w-full"
        onClick={sendResetPassword}
        disabled={resetLoading}
      >
        {resetLoading ? "Sending..." : "Reset"}
      </Button>
      {resetError && (
        <p className="text-red-500 text-sm">{resetError.message}</p>
      )}
      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}
      {success && (
        <div className="bg-green-100 text-green-600 px-2 rounded">
          Success! Please check your email to reset your password.
        </div>
      )}
      <Button
        variant="link"
        className="text-sm underline mt-4"
        onClick={onToggleReset}
      >
        Back to Login
      </Button>
    </div>
  );
}

export default function AuthPage() {
  const [resetPassword, setResetPassword] = useState(false);

  const toggleResetPassword = () => {
    setResetPassword(!resetPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {resetPassword ? (
        <ResetPasswordForm onToggleReset={toggleResetPassword} />
      ) : (
        <LoginForm onToggleReset={toggleResetPassword} />
      )}
    </div>
  );
}