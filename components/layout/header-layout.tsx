import * as React from "react";

type HeaderLayoutProps = {
  title?: string
  Left?: React.ReactNode | (() => React.ReactElement)
  Right: React.ReactNode | (() => React.ReactElement)
}

export default function HeaderLayout(props: HeaderLayoutProps) {
  const { Right, Left, title } = props;
  return (
    <div className="w-full flex p-3 py-2 items-center justify-between">
      <div className="flex items-center space-x-1">
        {title && <h1 className="text-xl">{title}</h1>}
        {typeof Left === "function" ? <Left /> : Left}
      </div>
      <div className="flex items-center space-x-1">
        {typeof Right === "function" ? <Right /> : Right}
      </div>
    </div>
  )
}

