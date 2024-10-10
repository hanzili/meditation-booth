"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Notification() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("notificationAcknowledged");
    const hasSeenBoolean = hasSeen === "true";
    setShowNotification(!hasSeenBoolean);
  }, []);

  const handleAcknowledge = () => {
    setShowNotification(false);
    sessionStorage.setItem("notificationAcknowledged", "true");
  };

  const handleGoBack = () => {
    window.location.href = "https://www.oniji.ca";
  };

  if (!showNotification) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Important Notification
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotification(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Welcome to the OpenBooth Meditation Experience at MAIS 2024.
            This web app is exclusively for those who have scanned the QR code
            to access a meditation session. If you are not currently using the
            OpenBooth at MAIS 2024, please return to the main page
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleGoBack}>
            Go Back to Main Page
          </Button>
          <Button onClick={handleAcknowledge}>Acknowledge</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
