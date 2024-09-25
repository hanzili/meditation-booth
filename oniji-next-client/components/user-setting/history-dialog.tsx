"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useQuery } from "@apollo/client";
import { GET_SESSIONS } from "@/lib/gql";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SessionInfo } from "./session-info";

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
  } = useQuery(GET_SESSIONS, {
    skip: !isOpen,
    fetchPolicy: 'network-only',
  });

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
        <DialogDescription>your calm level over time for each session</DialogDescription>
        <ScrollArea className="flex-grow">
          {sessions.map((session: any) => (
            <SessionInfo key={session.id} session={session} />
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
