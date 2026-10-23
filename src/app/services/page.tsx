import type { Metadata } from "next";
import ServicesScreen from "@/screens/ServicesScreen";
import Strings from "@/utils/Strings";

export const metadata: Metadata = {
  title: Strings.servicesPage.metaTitle,
  description: Strings.appDescription,
};

export default function Page() {
  return <ServicesScreen />;
}
