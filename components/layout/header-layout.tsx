import * as React from "react";

type HeaderLayoutProps = {
  title?: string
  left?: React.ReactNode | (() => React.ReactElement)
  right: React.ReactNode | (() => React.ReactElement)
}

export default function HeaderLayout(props: HeaderLayoutProps) {
  const {
    right: Right,
    left: Left,
    title
  } = props;

  return (
    <div className="w-full flex p-3 py-2 items-center justify-between">
      <div className="flex items-center space-x-1">
        {
          title &&
          <h1 className="text-xl">{title}</h1>
        }
        {
          typeof Left === "function"
            ? <Left />
            : Left
        }
      </div>
      <div className="flex items-center space-x-1">
        {
          typeof Right === "function"
            ? <Right />
            : Right
        }
      </div>
    </div>
  )
}

