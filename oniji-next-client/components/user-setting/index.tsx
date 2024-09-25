"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"
import { ProfileDialog } from "./profile-dialog"
import { HistoryDialog } from "./history-dialog"
import { useUser } from "@/components/wrappers/user-provider"

export function UserSetting() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const { user } = useUser()

  if (!user) return null

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <User className="h-[1.2rem] w-[1.2rem] text-foreground" />
            <span className="sr-only">User Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[30px] mr-3">
          <DropdownMenuItem className="justify-end" onSelect={() => setIsProfileOpen(true)}>Profile</DropdownMenuItem>
          <DropdownMenuItem className="justify-end" onSelect={() => setIsHistoryOpen(true)}>History</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfileDialog isOpen={isProfileOpen} onOpenChange={setIsProfileOpen} />
      <HistoryDialog isOpen={isHistoryOpen} onOpenChange={setIsHistoryOpen} />
    </>
  )
}