import type { Metadata } from "next";
import AboutScreen from "@/screens/AboutScreen";
import Strings from "@/utils/Strings";

export const metadata: Metadata = {
  title: Strings.aboutPage.metaTitle,
  description: Strings.appDescription,
};

export default function Page() {
  return <AboutScreen />;
}
