"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "@/lib/gql";

export default function ResetPasswordForm({
  onToggleReset,
}: {
  onToggleReset: () => void;
}) {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [resetPassword, { loading: resetLoading, error: resetError }] =
    useMutation(RESET_PASSWORD);

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
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
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
