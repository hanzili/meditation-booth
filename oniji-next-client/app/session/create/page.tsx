"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardHeader, CardContent } from "@/components/ui/card";

const FormSchema = z.object({
  mood: z.string().min(1, "Please select your mood."),
  sessionType: z.string().min(1, "Please select a session type."),
  scentPreference: z.string().min(1, "Please select your scent preference."),
});

export default function SessionForm() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: any) {
    // TODO: Replace any with the correct type
    console.log(data);
    // Handle form submission, e.g., send data to the backend
  }

  return (
    <Card className="w-2/3 m-auto p-5">
      <CardHeader>Start a Session</CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Mood Selection */}
            <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mood</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your mood" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-energy-pleasant">
                          High Energy Pleasant
                        </SelectItem>
                        <SelectItem value="high-energy-unpleasant">
                          High Energy Unpleasant
                        </SelectItem>
                        <SelectItem value="low-energy-pleasant">
                          Low Energy Pleasant
                        </SelectItem>
                        <SelectItem value="low-energy-unpleasant">
                          Low Energy Unpleasant
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Session Type Selection */}
            <FormField
              control={form.control}
              name="sessionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select session type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="guided-meditation">
                          Guided Meditation
                        </SelectItem>
                        <SelectItem value="music-only">
                          Music Only (no instructions)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Scent Preference */}
            <FormField
              control={form.control}
              name="scentPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scent Preference</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Label className="flex items-center mr-8">
                        <Input
                          type="radio"
                          value="yes"
                          checked={field.value === "yes"}
                          onChange={field.onChange}
                          className="w-fit mr-2"
                        />
                        Yes
                      </Label>
                      <Label className="flex items-center">
                        <Input
                          type="radio"
                          value="no"
                          checked={field.value === "no"}
                          onChange={field.onChange}
                          className="w-fit mr-2"
                        />
                        No
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Start</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
