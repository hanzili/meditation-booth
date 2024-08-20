"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { END_SESSION } from "@/lib/gql";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_SESSION } from "@/lib/gql";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SessionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [countdownTime, setCountdownTime] = useState(0);
  const [endSession, { loading: endSessionLoading, error: endSessionError }] =
    useMutation(END_SESSION);
  const {
    data,
    loading: getSessionLoading,
    error: getSessionError,
  } = useQuery(GET_SESSION, {
    variables: { input: { id: params.id } },
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (data && data.ONIJI_GetSession.session) {
      const session = data.ONIJI_GetSession.session;
      const duration = session.music.duration;
      setCountdownTime(duration);

      const interval = setInterval(() => {
        setCountdownTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            endSession({
              variables: {
                input: {
                  id: params.id,
                },
              },
            }).then(() => {
              router.push("/");
            });
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [data, endSession, params.id, router]);

  async function onClick() {
    const res = await endSession({
      variables: {
        input: {
          id: params.id,
        },
      },
    });

    const sessionId = res.data.ONIJI_EndSession.session.id;
    router.push(`/`);
  }

  if (getSessionLoading) return <div>Loading...</div>;
  if (getSessionError) return <div>Error: {getSessionError.message}</div>;

  const session = data.ONIJI_GetSession.session;

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4">
            Enjoy your meditation
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-8xl font-bold mb-4">
            {Math.floor(countdownTime / 60)}:
            {String(countdownTime % 60).padStart(2, "0")}
          </div>
          <Button onClick={onClick} disabled={endSessionLoading}>
            End
          </Button>
          {endSessionError && (
            <div className="text-red-500 mt-2">
              Error: {endSessionError.message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
