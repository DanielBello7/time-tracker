import UserImg from "./user-img";
import Text from "./text";

type UserInfoProps = {
  size?: any
  img?: string | null
  name?: string
  email?: string
}

function UserInfo({ email, img, name, size }: UserInfoProps) {
  return (
    <div className="flex items-center space-x-2">
      <UserImg size={size} img={img} />
      <div className="w-full -space-y-1">
        <p className="text-lg">{name ?? "James Doe"}</p>
        <Text sm type="sub">{email ?? "james@example.com"}</Text>
      </div>
    </div>
  )
}


export default UserInfo;
