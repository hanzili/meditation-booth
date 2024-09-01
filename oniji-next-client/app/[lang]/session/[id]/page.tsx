"use client";

import { useState, useEffect } from "react";
import { useLocalizedRouter } from "@/hooks/use-localized";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { END_SESSION, GET_SESSION } from "@/lib/gql";

export default function SessionPage({ params }: { params: { id: string } }) {
  const router = useLocalizedRouter();
  const [countdownTime, setCountdownTime] = useState(0);

  // GraphQL queries and mutations
  const [endSession, { loading: endSessionLoading, error: endSessionError }] =
    useMutation(END_SESSION);
  const {
    data,
    loading: getSessionLoading,
    error: getSessionError,
  } = useQuery(GET_SESSION, {
    variables: { input: { id: params.id } },
  });

  // Check for authentication
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
    }
  }, [router]);

  // Set up countdown timer
  useEffect(() => {
    if (data?.ONIJI_GetSession?.session) {
      const session = data.ONIJI_GetSession.session;
      const duration = session.music.duration;
      const startTime = new Date(session.start_time).getTime();
      const currentTime = new Date().getTime();
      const elapsedTime = Math.floor((currentTime - startTime) / 1000);
      const remainingTime = Math.max(duration - elapsedTime, 0);

      setCountdownTime(remainingTime);

      const interval = setInterval(() => {
        setCountdownTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            handleSessionEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [data]);

  // Handle session end
  const handleSessionEnd = async () => {
    await endSession({
      variables: { input: { id: params.id } },
    });
    router.push("/");
  };

  // Handle manual end button click
  const handleEndClick = async () => {
    await handleSessionEnd();
  };

  // Render loading and error states
  if (getSessionLoading) return <div>Loading...</div>;
  if (getSessionError) return <div>Error: {getSessionError.message}</div>;

  // Render countdown timer
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

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
            {formatTime(countdownTime)}
          </div>
          <Button onClick={handleEndClick} disabled={endSessionLoading}>
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
