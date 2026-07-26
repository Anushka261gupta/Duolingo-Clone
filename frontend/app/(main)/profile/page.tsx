"use client"

import { useState } from "react"
import { MainContent } from "@/components/layout"
import {
  ProfileHeader,
  ProfileStats,
  DailyGoalCard,
  AchievementsSection,
  LearningLanguageCard,
  RecentActivity,
} from "@/components/features/profile"
import { useProfile } from "@/hooks/use-profile"
import { Loader2, LogOut } from "lucide-react"
import { useAuthContext } from "@/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { ConfirmationDialog } from "@/components/shared"

export default function ProfilePage() {
  const { data: profile, isLoading, isEmpty } = useProfile()
  const { logout } = useAuthContext()
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)

  if (isLoading) {
    return (
      <MainContent>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="size-8 animate-spin text-duo-gray" />
        </div>
      </MainContent>
    )
  }

  if (isEmpty || !profile) {
    return (
      <MainContent>
        <div className="flex h-[50vh] flex-col items-center justify-center text-center">
          <h2 className="mb-2 text-2xl font-extrabold text-foreground">
            Profile Not Found
          </h2>
          <p className="text-duo-gray">We couldn't load this profile.</p>
        </div>
      </MainContent>
    )
  }

  return (
    <MainContent>
      <div className="flex flex-col gap-6 pb-24">
        <ProfileHeader
          displayName={profile.displayName}
          username={profile.username}
          joinDate={profile.joinDate}
          avatarUrl={profile.avatarUrl}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <ProfileStats
              streak={profile.streak}
              totalXp={profile.totalXp}
              hearts={profile.hearts}
              gems={profile.gems}
              completedLessons={profile.completedLessons}
              completedUnits={profile.completedUnits}
            />
            <LearningLanguageCard language={profile.currentLanguage} />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <DailyGoalCard goal={profile.dailyGoal} />
            <AchievementsSection achievements={profile.achievements} />
            <RecentActivity activity={profile.recentActivity} />
          </div>
        </div>

        {/* Logout Section */}
        <div className="mt-8 flex justify-center border-t-2 border-duo-gray-light pt-8">
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full max-w-sm border-2 border-duo-gray-light font-extrabold uppercase tracking-wide text-rose-500 hover:bg-rose-500/10 active:bg-rose-500/20"
            onClick={() => setIsLogoutOpen(true)}
          >
            <LogOut className="mr-2 size-5" strokeWidth={2.5} />
            Sign Out
          </Button>
        </div>

        <ConfirmationDialog 
          isOpen={isLogoutOpen}
          title="Sign out?"
          description="Are you sure you want to sign out of your account? You will need to log back in to save your progress."
          confirmText="Sign out"
          cancelText="Cancel"
          onConfirm={logout}
          onCancel={() => setIsLogoutOpen(false)}
        />
      </div>
    </MainContent>
  )
}
