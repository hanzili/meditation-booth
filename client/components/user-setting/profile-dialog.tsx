"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@apollo/client"
import { UPDATE_USER } from "@/lib/gql"
import { useUser } from "@/components/wrappers/user-provider"

interface ProfileDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileDialog({ isOpen, onOpenChange }: ProfileDialogProps) {
  const { user, setUser } = useUser()
  const [localFirstName, setLocalFirstName] = useState(user?.firstName || "")
  const [localLastName, setLocalLastName] = useState(user?.lastName || "")
  const [updateUser, { loading: updateUserLoading, error: updateUserError }] = useMutation(UPDATE_USER)

  useEffect(() => {
    setLocalFirstName(user?.firstName || "")
    setLocalLastName(user?.lastName || "")
  }, [user])

  const handleSave = () => {
    updateUser({ variables: { input: { first_name: localFirstName, last_name: localLastName } } })
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-5/6 rounded-lg">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Edit your profile information
        </DialogDescription>
        <div className="grid gap-4 py-4 text-foreground">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              First Name
            </Label>
            <Input
              id="firstName"
              value={localFirstName}
              onChange={(e) => setLocalFirstName(e.target.value)}
              className="col-span-3 text-foreground"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={localLastName}
              onChange={(e) => setLocalLastName(e.target.value)}
              className="col-span-3 text-foreground"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={user?.email || ""}
              readOnly
              className="col-span-3 text-foreground"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}