"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { END_SESSION } from "@/lib/gql";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SessionPage({ params }: { params: { id: string } }) {

  const router = useRouter();
  const [endSession, { loading, error }] = useMutation(END_SESSION);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
        router.push("/login");
    } else {
      setToken(storedToken);
    }
  }, [router]);

    async function onClick() {
        if (!token) return;
        
        const res = await endSession({
          variables: {
            input: {
                id: params.id,
            },
          },
          context: {
            headers: {
              authorization: token,
            },
          },
        });
    
        const sessionId = res.data.ONIJI_EndSession.session.id;
        router.push(`/session/${sessionId}`);
      }

  return (
    <div>
      <h1>Session Page</h1>
      <p>{params.id}</p>
      <Button onClick={onClick} disabled={loading}>{loading ? "Ending..." : "End"}</Button>
      {error && <p>{error.message}</p>}
    </div>
  );
}
