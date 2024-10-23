"use client";

import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { useRouter } from "next/navigation";

export default function LanguageToggle({
  params,
}: {
  params: { lang: string };
}) {
  const router = useRouter();

  const handleLanguageChange = (newLanguage: string) => {
    localStorage.setItem("language", newLanguage);
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/[^\/]+/, `/${newLanguage}`);
    router.push(newPath);
  };

  return (
    <Toggle onClick={() => handleLanguageChange(params.lang === "en" ? "fr" : "en")}>
      <span>{params.lang === "en" ? "🇫🇷" : "🇬🇧"}</span>
      {params.lang === "en" ? "FR" : "EN"}
    </Toggle>
  );
}
