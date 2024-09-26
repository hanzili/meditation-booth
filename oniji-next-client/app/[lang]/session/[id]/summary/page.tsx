"use client";

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SESSION } from '@/lib/gql';
import { useLocalizedRouter } from '@/hooks/use-localized';
import { SessionInfo } from '@/components/user-setting/session-info';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SessionSummaryPage({ params }: { params: { id: string, lang: string } }) {
  const router = useLocalizedRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_SESSION, {
    variables: { input: { id: params.id } },
  });

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen">Error: {error.message}</div>;

  const session = data?.ONIJI_GetSession?.session;

  if (!session) return <div className="flex items-center justify-center min-h-screen">No session found</div>;

  const handleHomeClick = () => {
    setIsModalOpen(true);
  };

  const handleDonate = () => {
    window.open('https://buymeacoffee.com/oniji', '_blank');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/');
  };

  return (
    <div className="flex flex-col bg-background p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Session Summary</h1>
      <div className="flex-grow mb-6">
        <SessionInfo session={session} />
      </div>
      <div className="flex justify-center">
        <Button 
          onClick={handleHomeClick} 
          variant="outline"
          className="text-foreground"
          aria-label="Go to home"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="text-foreground w-11/12 rounded-lg">
          <DialogHeader>
            <DialogTitle>Thank you for using our app!</DialogTitle>
            <DialogDescription>
              If you found it helpful, we'd appreciate your support. Consider donating to help us improve.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button variant="outline" onClick={handleDonate}>
              Donate
            </Button>
            <Button variant="ghost" onClick={handleCloseModal}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
