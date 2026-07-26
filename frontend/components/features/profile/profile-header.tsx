import { ProfileAvatar } from "./profile-avatar"

interface ProfileHeaderProps {
  displayName: string
  username: string
  joinDate: string
  avatarUrl: string
}

export function ProfileHeader({
  displayName,
  username,
  joinDate,
  avatarUrl,
}: ProfileHeaderProps) {
  return (
    <div className="mb-8 flex items-center gap-6">
      <ProfileAvatar avatarUrl={avatarUrl} displayName={displayName} />
      <div>
        <h1 className="text-3xl font-extrabold text-foreground">{displayName}</h1>
        <p className="text-lg font-bold text-duo-gray">@{username}</p>
        <p className="mt-2 text-sm font-semibold text-duo-gray">Joined {joinDate}</p>
      </div>
    </div>
  )
}
