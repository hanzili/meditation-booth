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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const FormSchema = z.object({
  mood: z.string().min(1, "Please select your mood."),
  session_type: z.string().min(1, "Please select a session type."),
  has_scent: z.boolean().refine((val) => val === true || val === false, {
    message: "Please select your scent preference.",
  }),
  // Remove is_long from the schema
});

type FormValues = z.infer<typeof FormSchema>;

export default function CreateSessionPage({ params }: { params: { lang: string } }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isLong, setIsLong] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    
    // Open the dialog instead of immediately creating the session
    setIsDialogOpen(true);
  }

  const handleSessionLengthChoice = async (long: boolean) => {
    setIsLong(long);
    setIsDialogOpen(false);

    // Now create the session with the chosen length
    const res = await createSession({
      variables: {
        input: {
          ...form.getValues(),
          is_long: long,
          language: params.lang,
        },
      },
    });

    const sessionId = res.data.ONIJI_CreateSession.session.id;
    router.push(`/session/${sessionId}`);
  };

  return (
    <Card className="w-full m-auto p-5">
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
                  <div className="flex items-center space-x-2">
                    <FormLabel>Mood</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span onClick={(e) => e.preventDefault()}>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>We use your current mood to tailor the meditation experience to your emotional state.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
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
                  <div className="flex items-center space-x-2">
                    <FormLabel>Session Type</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span onClick={(e) => e.preventDefault()}>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>guided meditation is recommended for beginners and those who want to follow along with instructions.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
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
                  <div className="flex items-center space-x-2">
                    <FormLabel>Scent Preference</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span onClick={(e) => e.preventDefault()}>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Indicate if you&apos;d like to incorporate aromatherapy into your meditation session.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
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

            {/* Replace Session Length Preference with a Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="w-5/6 max-w-4xl flex flex-col rounded-lg">
                <DialogHeader>
                  <DialogTitle>Try a Longer Session?</DialogTitle>
                  <DialogDescription>
                    Would you like to try a longer meditation session? This can provide a deeper experience.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col justify-center items-center">
                  <Button className="mb-3 w-full" onClick={() => handleSessionLengthChoice(false)}>
                    Keep it Short (5-10 minutes)
                  </Button>
                  <Button className="w-full" onClick={() => handleSessionLengthChoice(true)}>
                    Try Longer (more than 10 minutes)
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button type="submit" disabled={loading}>
              {loading ? "Starting..." : "Start"}
            </Button>

            {error && <p className="text-red-500">{error.message}</p>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}