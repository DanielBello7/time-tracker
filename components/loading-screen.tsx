import Spinner from "./spinner";

export default function LoadingScreen() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Spinner />
    </div>
  )
}

