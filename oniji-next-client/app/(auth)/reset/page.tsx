"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UPDATE_PASSWORD } from "@/lib/gql";

export default function Reset() {
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const token = hashParams.get("access_token");

    if (token) {
      localStorage.setItem("token", token);
    } else {
      setMessage("Invalid or missing access token");
      router.push("/login");
    }
  }, [router]);

  const [updatePassword, { loading, error }] = useMutation(UPDATE_PASSWORD);

  const confirmPasswords = async () => {
    setMessage(null); // Clear previous messages
    setIsSuccess(false);

    if (password !== cpassword) {
      setMessage("Your passwords do not match");
      return;
    }

    try {
      const { data } = await updatePassword({
        variables: {
          input: {
            password: password,
          },
        },
      });

      if (!(data?.ONIJI_UpdateUser?.error_code)) {
        localStorage.setItem("token", data.ONIJI_UpdateUser.user.token);
        localStorage.setItem(
          "refresh_token",
          data.ONIJI_UpdateUser.user.refresh_token
        );

        setMessage(
          "Password reset successful! You can now log in with your new password."
        );
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000); // Redirect to login after 3 seconds
      } else {
        setMessage("Password reset failed. Please try again.");
      }
    } catch (e) {
      console.error("Password reset failed:", e);
      setMessage(
        "An error occurred while resetting your password. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm p-3">
        <CardHeader>
          <CardTitle className="text-2xl">Reset your password</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="newpass">Enter your new password</Label>
            <Input
              id="newpass"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="cpassword">Confirm your new password</Label>
            <Input
              id="cpassword"
              type={showPassword ? "text" : "password"}
              value={cpassword}
              onChange={(e) => setcPassword(e.target.value)}
              required
              className="mt-2"
            />
          </div>
          <div className="mb-4 text-sm">
            <p
              className="cursor-pointer hover:underline"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide passwords" : "Show passwords"}
            </p>
          </div>
          <Button
            type="submit"
            className="w-full"
            onClick={confirmPasswords}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Confirm & Reset"}
          </Button>
          {message && (
            <p
              className={`mt-4 text-sm ${
                isSuccess ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-sm mt-2">Error: {error.message}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
