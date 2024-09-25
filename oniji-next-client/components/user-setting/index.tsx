"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@/components/wrappers/user-provider"
import { User } from "lucide-react"
import { ProfileDialog } from "./profile-dialog"
import { HistoryDialog } from "./history-dialog"

export function UserSetting() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <User className="h-[1.2rem] w-[1.2rem] text-foreground" />
            <span className="sr-only">User Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setIsProfileOpen(true)}>Profile</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsHistoryOpen(true)}>History</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfileDialog isOpen={isProfileOpen} onOpenChange={setIsProfileOpen} />
      <HistoryDialog isOpen={isHistoryOpen} onOpenChange={setIsHistoryOpen} />
    </>
  )
}