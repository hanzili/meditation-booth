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
import { useMutation } from "@apollo/client";
import { CREATE_SESSION } from "@/lib/gql";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  mood: z.string().min(1, "Please select your mood."),
  session_type: z.string().min(1, "Please select a session type."),
  has_scent: z.boolean().refine((val) => val === true || val === false, {
    message: "Please select your scent preference.",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function CreateSessionPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log(storedToken);
    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);
    }
  }, [router]);

  const [createSession, { loading, error }] = useMutation(CREATE_SESSION);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });


  async function onSubmit(data: FormValues) {
    if (!token) return;
    
    const res = await createSession({
      variables: {
        input: data,
      },
    });

    const sessionId = res.data.ONIJI_CreateSession.session.id;
    router.push(`/session/${sessionId}`);
  }

  return (
    <Card className="w-3/4 m-auto p-5">
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
                        <SelectItem value="HIGH_ENERGY_PLEASANT">
                          High Energy Pleasant
                        </SelectItem>
                        <SelectItem value="HIGH_ENERGY_UNPLEASANT">
                          High Energy Unpleasant
                        </SelectItem>
                        <SelectItem value="LOW_ENERGY_PLEASANT">
                          Low Energy Pleasant
                        </SelectItem>
                        <SelectItem value="LOW_ENERGY_UNPLEASANT">
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
              name="session_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select session type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GUIDED">
                          Guided Meditation
                        </SelectItem>
                        <SelectItem value="MUSIC_ONLY">
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
              name="has_scent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scent Preference</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Label className="flex items-center mr-8">
                        <Input
                          type="radio"
                          value="true"
                          checked={field.value === true}
                          onChange={() => field.onChange(true)}
                          className="w-fit mr-2"
                        />
                        True
                      </Label>
                      <Label className="flex items-center">
                        <Input
                          type="radio"
                          value="false"
                          checked={field.value === false}
                          onChange={() => field.onChange(false)}
                          className="w-fit mr-2"
                        />
                        False
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Starting..." : "Start"}
            </Button>

            {/* error */}
            {error && <p className="text-red-500">{error.message}</p>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}