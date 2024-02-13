import UserImg from "../user-img";

type UserInfoProps = {
  size?: string
}

export default function UserInfo({ size }: UserInfoProps) {
  return (
    <div className="flex items-center space-x-2">
      <UserImg size={size} />
      <div className="w-full -space-y-1">
        <p className="text-lg">
          James Doe
        </p>
        <p className="text-gray-400 text-xs">
          james@example.com
        </p>
      </div>
    </div>
  )
}

