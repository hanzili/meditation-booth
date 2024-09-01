"use client";

import { useEffect } from "react";
import { useLocalizedRouter } from "@/hooks/use-localized";
import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import { GET_USER, GET_SESSIONS } from "@/lib/gql";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDictionary } from "../../components/wrappers/dictionary-wrapper";
import { formatDistanceToNow } from 'date-fns';
import { ScrollArea } from "@/components/ui/scroll-area";

export default function HomePage() {
  const router = useLocalizedRouter();
  const dict: any = useDictionary();
  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
    }
  }, [router]);

  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER);
  const { loading: sessionsLoading, error: sessionsError, data: sessionsData } = useQuery(GET_SESSIONS);

  const user = userData?.ONIJI_User?.user;
  const sessions = sessionsData?.ONIJI_GetSessions?.sessions || [];

  if (userLoading || sessionsLoading) return <div>Loading...</div>;
  if (userError) return <div>Error: {userError.message}</div>;
  if (sessionsError) return <div>Error: {sessionsError.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-6 p-6 mb-6">
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

      <Card className="max-w-md w-full p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Session History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <p className="text-zinc-400">{dict.HomePage.NoSessions}</p>
          ) : (
            <ScrollArea className="h-[300px] w-full rounded-md">
              <div className="space-y-4 pr-4">
                {sessions.map((session: any) => (
                  <div key={session.id} className="border-b border-gray-700 pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0">
                    <p className="font-semibold text-lg">{session.music.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(session.start_time), { addSuffix: true })}
                    </p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">Mood: {session.mood}</p>
                      <p className="text-sm">Session type: {session.session_type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}