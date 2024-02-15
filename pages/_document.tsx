import { Html, Head, Main, NextScript } from "next/document";
import { font } from "@/constants";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={font.inter.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
