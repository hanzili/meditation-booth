import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReportChart } from "@/components/report-chart";
import { formatDistanceToNow } from "date-fns";
import { parseCustomDateString } from "@/lib/utils";

interface SessionInfoProps {
  session: {
    music: { name: string };
    mood: string;
    session_type: string;
    calm: string;
    start_time: string;
    end_time: string;
    has_scene: boolean;
  };
}

export function SessionInfo({ session }: SessionInfoProps) {
  const [chartData, setChartData] = useState<number[]>([]);
  const [isDataReady, setIsDataReady] = useState(false);

  const getMoodInfo = (mood: string) => {
    if (mood == "HIGH_ENERGY_UNPLEASANT") {
      return "High-energy unpleasant";
    } else if (mood == "HIGH_ENERGY_PLEASANT") {
      return "High-energy pleasant";
    } else if (mood == "LOW_ENERGY_UNPLEASANT") {
      return "Low-energy unpleasant";
    } else if (mood == "LOW_ENERGY_PLEASANT") {
      return "Low-energy pleasant";
    }
  };

  const getSessionTypeInfo = (sessionType: string) => {
    if (sessionType == "GUIDED") {
      return "Guided";
    } else if (sessionType == "MUSIC_ONLY") {
      return "Music only";
    }
  };

  const getScentInfo = (hasScent: boolean) => {
    if (hasScent) {
      return "With scent";
    } else {
      return "Without scent";
    }
  };

  const getMeditationLengthInfo = (music: string) => {
    if (music.includes("long")) {
      return "Long session";
    } else {
      return "Short session";
    }
  };

  const calculateSessionLength = (startTime: string, endTime: string): number => {
    const start = parseCustomDateString(startTime);
    const end = parseCustomDateString(endTime);
    return Math.round((end - start) / 1000);
  };

  const sessionLength = calculateSessionLength(session.start_time, session.end_time);

  useEffect(() => {
    if (session.calm && session.calm.trim() !== '') {
      const points = session.calm.split(",").map(Number);
      setChartData(points);
      setIsDataReady(true);
    }
  }, [session.calm]);

  const hasData = session.calm && session.calm.trim() !== '';

  return (
    <Card className="w-full max-w-md mb-4">
      <CardHeader>
        <CardTitle className="text-lg">
          Session {formatDistanceToNow(parseCustomDateString(session.start_time), {
            addSuffix: true,
          })}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Badge className="mr-2">{getMoodInfo(session.mood)}</Badge>
        <Badge className="mr-2">{getSessionTypeInfo(session.session_type)}</Badge>
        <Badge className="mr-2">{getScentInfo(session.has_scene)}</Badge>
        <Badge className="mr-2">{getMeditationLengthInfo(session.music.name)}</Badge>
        {isDataReady && <Badge>{`${sessionLength} seconds`}</Badge>}
        {isDataReady && (
          <ReportChart 
            points={chartData} 
            sessionLength={sessionLength}
          />
        )}
      </CardContent>
    </Card>
  );
}
