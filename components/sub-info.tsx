type SubInfoProps = {
  title: string
  msg: string
}
export default function SubInfo({ msg, title }: SubInfoProps) {
  return (
    <div className="space-y-1">
      <p className="text-[#4891FF] text-xs uppercase">
        #{title}
      </p>
      <p className="text-gray-400">
        {msg}
      </p>
    </div>
  )
}

