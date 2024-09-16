"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/components/wrappers/user-provider"
import { User } from "lucide-react"
import { useMutation } from "@apollo/client"
import { UPDATE_USER } from "@/lib/gql"

export function UserProfile() {
  const { user, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false)
  const [localFirstName, setLocalFirstName] = useState(user?.firstName || "")
  const [localLastName, setLocalLastName] = useState(user?.lastName || "")
  const [updateUser, { loading: updateUserLoading, error: updateUserError }] = useMutation(UPDATE_USER)
  // Update local state when user data changes
  useEffect(() => {
    if (user) {
      setLocalFirstName(user.firstName || "")
      setLocalLastName(user.lastName || "")
    }
  }, [user])

  const handleSave = () => {
    updateUser({ variables: { input: { first_name: localFirstName, last_name: localLastName } } })
    setIsOpen(false)
  }

  if (isLoading) return null
  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <User className="h-[1.2rem] w-[1.2rem] text-foreground" />
          <span className="sr-only">User Profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-5/6 rounded-lg">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        <DialogDescription>
        Edit your profile information
      </DialogDescription>
        <div className="grid gap-4 py-4">
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
