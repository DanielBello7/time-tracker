import { CgSpinner } from "react-icons/cg";

type SpinnerProps = {
  size?: "sm" | "md" | "lg"
}

export default function Spinner({ size }: SpinnerProps) {
  const current = size === "lg" ? 60 : size === "md" ? 40 : 20
  return (
    <div className="inline-block animate-spin">
      <CgSpinner size={current} />
    </div>
  )
}