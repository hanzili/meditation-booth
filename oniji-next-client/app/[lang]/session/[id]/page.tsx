"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLocalizedRouter } from "@/hooks/use-localized";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { END_SESSION, GET_SESSION } from "@/lib/gql";

export default function SessionPage({ params }: { params: { id: string } }) {
  const router = useLocalizedRouter();
  const [countdownTime, setCountdownTime] = useState(0);
  const handleSessionEndRef = useRef<() => Promise<void>>();

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

  // Handle session end
  handleSessionEndRef.current = useCallback(async () => {
    try {
      await endSession({
        variables: { input: { id: params.id } },
      });
      router.push(`/session/${params.id}/summary`);
    } catch (error) {
      console.error("Failed to end session:", error);
    }
  }, [endSession, params.id, router]);

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
            handleSessionEndRef.current?.();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [data]);

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
    <div className="flex items-center justify-center w-full">
      <Card className="w-full max-w-md p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Enjoy your meditation
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="text-8xl font-bold mb-8">
            {formatTime(countdownTime)}
          </div>
          <Button 
            onClick={() => handleSessionEndRef.current?.()} 
            disabled={endSessionLoading} 
            className="w-full max-w-xs"
          >
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
