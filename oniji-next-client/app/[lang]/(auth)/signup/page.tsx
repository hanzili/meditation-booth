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
import { SIGNUP_BY_EMAIL } from "@/lib/gql";
import { useDictionary } from "@/components/wrappers/dictionary-wrapper";
import { DataPolicyAgreement } from "@/components/data-policy-agreement";

export default function SignupPage() {
  const dict: any = useDictionary();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const router = useLocalizedRouter();

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

    if (!email.trim()) {
      setErrorMessage("Email cannot be empty.");
      return;
    }

    if (password!== cpassword) {
      setErrorMessage("Passwords entered are not identical")
      return;
    }

    if (!agreedToPolicy) {
      setErrorMessage("You must agree to the Data Policy to sign up.");
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

        router.push("/");
      }
    } catch (e) {
      console.error("Error during signup:", e);
      setErrorMessage("An error occurred during signup.");
    }
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">{dict.SignupPage.Title}</CardTitle>
          <CardDescription>
            {dict.SignupPage.Description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">{dict.SignupPage.FirstName}</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">{dict.SignupPage.LastName}</Label>
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
              <Label htmlFor="email">{dict.SignupPage.Email}</Label>
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
              <Label htmlFor="password">{dict.SignupPage.Password}</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{dict.SignupPage.ConfirmPassword}</Label>
              <Input
                id="cpassword"
                type={showPassword? 'text' :'password'}
                value={cpassword}
                onChange={(e) => setcPassword(e.target.value)}
                required
              />
            </div>
            <div onClick={() => setShowPassword(!showPassword)}>
              <p className="cursor-pointer hover:underline text-sm">
                {showPassword ? dict.SignupPage.HidePassword : dict.SignupPage.ShowPassword}
              </p>
            </div>
            <DataPolicyAgreement onAgreementChange={setAgreedToPolicy} />
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <Button
              type="submit"
              className="w-full"
              onClick={handleSignup}
              disabled={loading || !agreedToPolicy}
            >
              {loading ? dict.SignupPage.SigningUp : dict.SignupPage.SignUp}
            </Button>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </div>
          <div className="mt-4 text-center text-sm">
            {dict.SignupPage.AlreadyHaveAnAccount}
            <Link href="/login" className="underline">
              {dict.SignupPage.SignIn}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
