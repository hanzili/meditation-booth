"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function Reset() {

  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");

  const router = useRouter();
 

  const confirmPasswords = async () => {
    if (password!== cpassword) 
      return alert ('Your password are not the same')

    // update the database
    /* updateUser({
      password: password
    })
    */

    //if the user successfully updated the ps, then go back to the login page
    /* if (resetData){
       router.push('./login')
    }
    */

  }

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex items-center justify-center">

      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className=" text-2xl">
            Reset your password
          </CardTitle>
        </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Enter your new password</Label>
                <Input
                  id="newpass"
                  type={showPassword? 'text' :'password'}
                  value={password}
                  onChange={(e) => setPassword (e. target. value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="password">Confirm your new password</Label>
                </div>
                <Input
                  id="cpassword"
                  type={showPassword? 'text' :'password'}
                  value={cpassword}
                  onChange={(e) => setcPassword (e. target. value)}
                  required
                />
              </div>
              <div onClick = {() => setShowPassword(!showPassword)}>
                <p className="cursor-pointer hover:underline text-sm"> Show passwords</p>
              </div>
              <Button type="submit" className="w-full" onClick={confirmPasswords}>
                   Confirm & Reset
              </Button>
            </div>
          </CardContent>
        

      </Card>
    </div>
  );
}
