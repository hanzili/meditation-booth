"use client";

import { useState } from "react";
import LoginForm from "./login-form";
import ResetPasswordForm from "./reset-password-form";

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
