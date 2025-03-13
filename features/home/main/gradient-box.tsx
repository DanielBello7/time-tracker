type GradientBoxProps = {
  reverse?: boolean
}
export default function GradientBox(props: GradientBoxProps) {
  const { reverse = false } = props;
  if (reverse) {
    return (
      <div className="w-full h-[150px] bg-gradient-to-t from-white from-50%" />
    )
  }
  return (
    <div className="w-full h-[150px] bg-gradient-to-b from-white from-50%" />
  )
}

