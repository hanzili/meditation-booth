"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLocalizedRouter } from "@/hooks/use-localized";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { END_SESSION, GET_SESSION } from "@/lib/gql";
import Image from "next/image";
import InstructionImage from "@/public/instruction.webp";
import { format } from 'date-fns';

// Add this function at the top of your file, outside of any component
function parseCustomDateString(dateString: string): number {
  const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})\.(\d{6}) ([+-]\d{4}) (\w+)/;
  const match = dateString.match(regex);
  
  if (match) {
    const [_, year, month, day, hour, minute, second, microsecond, offset] = match;
    const date = new Date(Date.UTC(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      parseInt(second),
      parseInt(microsecond) / 1000
    ));
    
    // Apply the offset
    const offsetMinutes = parseInt(offset.slice(0, 3)) * 60 + parseInt(offset.slice(3));
    date.setMinutes(date.getMinutes() - offsetMinutes);
    
    return date.getTime();
  }
  
  console.error('Failed to parse date string:', dateString);
  return Date.now(); // Fallback to current time if parsing fails
}

function PopUp({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 m-6">
      <Card className="w-full max-w-md p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image
            src={InstructionImage}
            alt="Brain wave detector instructions"
            width={300}
            height={200}
            className="mb-4"
          />
          <p className="text-center mb-4">
            Please wear the brain wave detector as shown in the picture.
          </p>
          <Button onClick={onClose} className="w-full max-w-xs">
            Got it
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SessionPage({ params }: { params: { id: string } }) {
  const router = useLocalizedRouter();
  const [countdownTime, setCountdownTime] = useState(0);
  const handleSessionEndRef = useRef<() => Promise<void>>();
  const [showPopUp, setShowPopUp] = useState(true);

  // GraphQL queries and mutations
  const [endSession, { loading: endSessionLoading, error: endSessionError }] =
    useMutation(END_SESSION);
  const { data, loading: getSessionLoading, error: getSessionError } = useQuery(GET_SESSION, {
    variables: { input: { id: params.id } },
    pollInterval: 5000, // Poll every 5 seconds
    onCompleted: (data) => {
      if (data?.ONIJI_GetSession?.session) {
        const session = data.ONIJI_GetSession.session;

        if (session.end_time) {
          router.push(`/session/${params.id}/summary`);
          return;
        }

        const duration = session.music.duration;
        const startTime = parseCustomDateString(session.start_time);
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        const remainingTime = Math.max(duration - elapsedTime, 0);

        setCountdownTime(remainingTime);
      } else {
        console.log('No session data in the response');
      }
    },
  });

  // Handle session end
  const handleSessionEnd = useCallback(async () => {
    try {
      await endSession({
        variables: { input: { id: params.id } },
      });
      router.push(`/session/${params.id}/summary`);
    } catch (error) {
      console.error("Failed to end session:", error);
    }
  }, [endSession, params.id, router]);

  handleSessionEndRef.current = handleSessionEnd;

  // Update countdown timer every second
  useEffect(() => {
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
  }, []);

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
      {showPopUp && <PopUp onClose={() => setShowPopUp(false)} />}
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
            onClick={handleSessionEnd} 
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