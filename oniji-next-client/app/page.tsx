"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/lib/gql";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
    }
  }, [router]);

  const { loading, error, data } = useQuery(GET_USER);

  const user = data?.ONIJI_User?.user;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-6 p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Nice to see you, {user?.first_name}!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-muted-foreground">
            Would you like to start a meditation session?
          </p>
          <Button
            className="w-full"
            onClick={() => router.push("/session/create")}
          >
            Start Meditation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
