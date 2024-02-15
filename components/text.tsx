import classNames from "classnames";
import * as React from "react";

type TextProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & {
  children?: any
  type?: "h1" | "sub" | "md"
}

export default function Text({ children, type, className, ...props }: TextProps) {
  const cn = classNames({
    "text-sm text-gray-400": type === "sub",
    "text-2xl": type === "h1",
    "text-md": type === "md"
  }, className);
  return (
    <p {...props} className={cn}>{children}</p>
  )
}

