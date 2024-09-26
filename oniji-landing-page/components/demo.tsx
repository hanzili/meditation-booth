"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function Demo() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const moods = [
    {
      id: "low-pleasant",
      label: "Low Energy Pleasant",
      emoji: "😌",
      music: "/music/low-energy-pleasant-en.mp3",
    },
    {
      id: "low-unpleasant",
      label: "Low Energy Unpleasant",
      emoji: "😔",
      music: "/music/low-energy-unpleasant-en.mp3",
    },
    {
      id: "high-pleasant",
      label: "High Energy Pleasant",
      emoji: "😃",
      music: "/music/high-energy-pleasant-en.mp3",
    },
    {
      id: "high-unpleasant",
      label: "High Energy Unpleasant",
      emoji: "😤",
      music: "/music/high-energy-unpleasant-en.mp3",
    },
  ];

  useEffect(() => {
    if (selectedMood && audioRef.current) {
      const selectedMoodData = moods.find((mood) => mood.id === selectedMood);
      if (selectedMoodData) {
        audioRef.current.src = selectedMoodData.music;
        audioRef.current.play();
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
  }, [selectedMood, moods]);

  return (
    <section id="demo" className="w-full py-12 md:py-24 lg:py-32 bg-muted flex flex-col items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
        <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm text-primary mb-4">Virtual Demo</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
            How are you feeling today?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            This demo customizes music by mood, while our booth offers a
            personalized environment considering more factors.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-3xl mx-auto">
          {moods.map((mood) => (
            <Button
              key={mood.id}
              variant={selectedMood === mood.id ? "default" : "outline"}
              className={`h-auto py-4 px-6 text-left flex items-center justify-between ${
                selectedMood === mood.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => {
                if (selectedMood === mood.id) {
                  setSelectedMood(null);
                } else {
                  setSelectedMood(mood.id);
                }
              }}
            >
              <span className="flex items-center">
                <span
                  className="text-2xl mr-2"
                  role="img"
                  aria-label={mood.label}
                >
                  {mood.emoji}
                </span>
                <span className="font-semibold">{mood.label}</span>
              </span>
              {selectedMood === mood.id && (
                <CheckCircle className="h-5 w-5 ml-2" />
              )}
            </Button>
          ))}
        </div>
        {selectedMood && (
          <p className="mt-6 text-center text-muted-foreground">
            You selected:{" "}
            <span className="font-semibold">
              {moods.find((m) => m.id === selectedMood)?.label}
            </span>
          </p>
        )}
        <audio ref={audioRef} />
      </div>
    </section>
  );
}
