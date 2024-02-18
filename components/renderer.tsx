import * as React from "react";
import Spinner from "./spinner";
import ErrorComponent from "./error-component";
import ensureError from "@/lib/ensure-error";

type RendererProps = {
  isLoading: boolean
  refresh?: () => void
  children: React.ReactNode
  error: unknown
  loader?: React.ReactNode
}

export default function Renderer(props: RendererProps) {
  const [converted, setConverted] = React.useState<Error | null>(null);
  const {
    loader,
    children,
    error,
    isLoading,
    refresh
  } = props;

  const loadingComponent = loader ?? <div className="w-full py-20 flex items-center justify-center"><Spinner /></div>

  React.useEffect(() => {
    if (!error) return
    if (error instanceof Error) return setConverted(error);
    const err = ensureError(error);
    setConverted(err);
  }, [error])

  if (error) return <ErrorComponent error={converted} refresh={refresh} />
  return (
    <React.Fragment>
      {isLoading ? loadingComponent : children}
    </React.Fragment>
  )
}

