"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useQuery, gql } from "@apollo/client";
import { GET_USER } from "@/lib/gql";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log(storedToken);
    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);
    }
  }, [router]);

  const { loading, error, data } = useQuery(GET_USER, {
    skip: !token, // Skip the query until token is available
    context: {
      headers: {
        authorization: token,
      },
    },
  });

  const user = data?.ONIJI_User?.user;

  return (
    <div className="w-full min-h-[100dvh] flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Nice to see you, {user && user.first_name}!
          </h1>
          <p className="text-muted-foreground">
            Would you like to start a meditation session?
          </p>
        </div>
        <Button
          className="w-full"
          onClick={() => router.push("/session/create")}
        >
          Start Meditation
        </Button>
      </div>
    </div>
  );
}
