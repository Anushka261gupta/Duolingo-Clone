import Image from "next/image"

interface ProfileAvatarProps {
  avatarUrl: string
  displayName: string
}

export function ProfileAvatar({ avatarUrl, displayName }: ProfileAvatarProps) {
  return (
    <div className="relative size-32 overflow-hidden rounded-full border-4 border-duo-gray-light bg-duo-gray-light">
      {/* We use a standard img here for simplicity, but next/image is imported for future use if domains are configured */}
      <img
        src={avatarUrl}
        alt={`${displayName}'s avatar`}
        className="size-full object-cover"
      />
    </div>
  )
}
