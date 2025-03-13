import classNames from "classnames";
import * as React from "react";

type TextProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & {
  children?: any
  type?: "h1" | "sub" | "md"
  sm?: boolean
}

export default function Text(props: TextProps) {
  const {
    children,
    type,
    sm = false,
    className,
    ...rest
  } = props;
  const cn = classNames({
    "text-sm text-gray-400": type === "sub",
    "text-2xl": type === "h1",
    "text-md": type === "md",
    "text-xs": sm
  }, className);
  return (
    <p {...rest} className={cn}>{children}</p>
  )
}

