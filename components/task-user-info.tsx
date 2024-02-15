import UserImg from "./user-img";
import Text from "./text";

type UserInfoProps = {
  size?: any
}

function UserInfo({ size }: UserInfoProps) {
  return (
    <div className="flex items-center space-x-2">
      <UserImg size={size} />
      <div className="w-full -space-y-1">
        <p className="text-lg">James Doe</p>
        <Text sm type="sub">james@example.com</Text>
      </div>
    </div>
  )
}


export default UserInfo;
