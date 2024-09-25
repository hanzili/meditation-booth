"use client";

import { useState, useEffect } from "react";
import { useLocalizedRouter } from "@/hooks/use-localized";
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
import { useDictionary } from "@/components/wrappers/dictionary-wrapper";
import Notification from "./notification";

export default function LoginForm({
  onToggleReset,
}: {
  onToggleReset: () => void;
}) {
  const dict: any = useDictionary();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useLocalizedRouter();

  const [loginByEmail, { loading: loginLoading, error: loginError }] =
    useMutation(LOGIN_BY_EMAIL);

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
        localStorage.setItem(
          "refreshToken",
          data.ONIJI_LoginByEmail.user.refresh_token
        );
        router.push("/");
      }
    } catch (e) {
      setErrorMessage("An error occurred during login.");
    }
  };

  return (
    <>
      <Notification />
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{dict.LoginPage.Login}</CardTitle>
          <CardDescription>
            {dict.LoginPage.EnterYourEmailBelowToLoginToYourAccount}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{dict.LoginPage.Email}</Label>
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
                <Label htmlFor="password">{dict.LoginPage.Password}</Label>
                <p
                  className="cursor-pointer ml-auto inline-block text-sm underline"
                  onClick={onToggleReset}
                >
                  {dict.LoginPage.ResetPassword}
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
                {showPassword
                  ? dict.LoginPage.HidePassword
                  : dict.LoginPage.ShowPassword}
              </p>
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={handleLogin}
              disabled={loginLoading}
            >
              {loginLoading ? dict.LoginPage.LoggingIn : dict.LoginPage.Login}
            </Button>
            {loginError && (
              <p className="text-red-500 text-sm">{loginError.message}</p>
            )}
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              {dict.LoginPage.Register}
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
