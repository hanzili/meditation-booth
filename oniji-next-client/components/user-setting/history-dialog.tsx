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
    return null;
  }

  if (sessionsError) {
    console.error(sessionsError);
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-5/6 max-w-4xl h-[90vh] flex flex-col rounded-lg">
        <DialogHeader>
          <DialogTitle>Session History</DialogTitle>
          <DialogDescription>Your calm level over time for each session</DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-4">
          <div className="space-y-4">
            {sessions.map((session: any) => (
              <SessionInfo key={session.id} session={session} />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
