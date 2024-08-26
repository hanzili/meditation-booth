"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/lib/gql";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDictionary } from "../../components/wrappers/dictionary-wrapper";

export default function HomePage() {
  const router = useRouter();
  const dict: any = useDictionary();
  
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
            {dict.HomePage.Greeting} {user?.first_name}!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-muted-foreground">
            {dict.HomePage.AskToStartMeditation}
          </p>
          <Button
            className="w-full"
            onClick={() => router.push("/session/create")}
          >
            {dict.HomePage.StartMeditation}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}