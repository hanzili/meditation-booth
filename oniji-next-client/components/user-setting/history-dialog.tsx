"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";
import { ReportChart } from "@/components/report-chart";
import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import { GET_SESSIONS } from "@/lib/gql";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HistoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HistoryDialog({ isOpen, onOpenChange }: HistoryDialogProps) {
  const {
    loading: sessionsLoading,
    error: sessionsError,
    data: sessionsData,
    refetch,
  } = useQuery(GET_SESSIONS);

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  const sessions = sessionsData?.ONIJI_GetSessions?.sessions || [];

  if (sessionsLoading) {
    return <div>Loading sessions...</div>;
  }

  if (sessionsError) {
    return <div>Error loading sessions: {sessionsError.message}</div>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-5/6 max-w-4xl h-[90vh] flex flex-col rounded-lg">
        <DialogHeader>
          <DialogTitle>Session History</DialogTitle>
        </DialogHeader>
        <DialogDescription>View your activity history here.</DialogDescription>
        <ScrollArea className="flex-grow pr-4">
          <div className="space-y-4">
            {sessions.map((session: any) => (
              <div
                key={session.id}
                className="text-foreground border-b border-gray-700 pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0"
              >
                <p className="font-semibold text-lg">{session.music.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(session.start_time), {
                    addSuffix: true,
                  })}
                </p>
                <div className="my-2 space-y-1">
                  <p className="text-sm">Mood: {session.mood}</p>
                  <p className="text-sm">Session type: {session.session_type}</p>
                </div>
                {session.calm && (
                  <ReportChart points={session.calm.split(" ").map(Number)} />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
