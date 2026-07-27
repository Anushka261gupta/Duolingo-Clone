"use client"

import { useState } from "react"
import { MainContent } from "@/components/layout"
import {
  ProfileHeader,
  ProfileStats,
  ProfileQuests,
  ProfileAchievements,
  LearningLanguageCard,
  RecentActivity,
} from "@/components/features/profile"
import { Loader2, LogOut } from "lucide-react"
import { useAuthContext } from "@/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { ConfirmationDialog } from "@/components/shared"
import { useXP } from "@/providers/xp-provider"
import { useStreak } from "@/providers/streak-provider"
import { useGems } from "@/providers/gems-provider"
import { useHearts } from "@/providers/hearts-provider"
import { useProgress } from "@/hooks/use-progress"
import { useLeaderboard } from "@/hooks/use-leaderboard"
import { useDemoUser } from "@/hooks/use-demo-user"

export default function ProfilePage() {
  const { user, isLoading: authLoading, logout } = useAuthContext()
  const { totalXP } = useXP()
  const { currentStreak, longestStreak, completedDates } = useStreak()
  const { gems } = useGems()
  const { hearts } = useHearts()
  const { completedLessonCount, completedUnitCount } = useProgress()
  const { data: leaderboardData } = useLeaderboard()
  const { data: profileData, isLoading: profileLoading } = useDemoUser()
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)

  if (authLoading || profileLoading) {
    return (
      <MainContent>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="size-8 animate-spin text-duo-gray" />
        </div>
      </MainContent>
    )
  }

  // Graceful fallback if auth context is not available yet
  const displayName = user?.name || profileData.displayName || profileData.name
  const username = user?.username || profileData.username
  const avatarUrl = user?.avatar || profileData.avatarUrl
  const joinDate = profileData.joinDate
  const currentLanguage = profileData.currentLanguage
  const leagueName = leaderboardData?.league?.name

  return (
    <MainContent>
      <div className="flex flex-col gap-6 pb-24">
        <ProfileHeader
          displayName={displayName}
          username={username}
          joinDate={joinDate}
          avatarUrl={avatarUrl}
          courseName={currentLanguage.name}
          leagueName={leagueName}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <ProfileStats
              streak={currentStreak}
              longestStreak={longestStreak}
              daysActive={completedDates.length}
              totalXp={totalXP}
              hearts={hearts}
              gems={gems}
              completedLessons={completedLessonCount}
              completedUnits={completedUnitCount}
            />
            <LearningLanguageCard language={currentLanguage} />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <ProfileQuests />
            <ProfileAchievements />
            <RecentActivity />
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
