import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import { dmSans, spaceGrotesk } from "@/utils/Fonts";
import Strings from "@/utils/Strings";
import "./globals.css";

export const metadata: Metadata = {
  title: Strings.appName,
  description: Strings.appDescription,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
