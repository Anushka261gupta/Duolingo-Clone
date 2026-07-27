import { ProfileAvatar } from "./profile-avatar"

interface ProfileHeaderProps {
  displayName: string
  username: string
  joinDate: string
  avatarUrl: string
  courseName?: string
  leagueName?: string
}

export function ProfileHeader({
  displayName,
  username,
  joinDate,
  avatarUrl,
  courseName,
  leagueName,
}: ProfileHeaderProps) {
  return (
    <div className="mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
      <ProfileAvatar avatarUrl={avatarUrl} displayName={displayName} />
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-foreground">{displayName}</h1>
        <p className="text-lg font-bold text-duo-gray">@{username}</p>
        <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-4 text-sm font-semibold text-duo-gray">
          <span>Joined {joinDate}</span>
          {courseName && (
            <>
              <span className="hidden md:inline text-duo-gray-light">•</span>
              <span>Learning {courseName}</span>
            </>
          )}
          {leagueName && (
            <>
              <span className="hidden md:inline text-duo-gray-light">•</span>
              <span>{leagueName}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
