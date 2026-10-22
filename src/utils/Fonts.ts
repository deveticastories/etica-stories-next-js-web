import { DM_Sans, Space_Grotesk } from "next/font/google";

// Headings
export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Body copy — the optical-size axis matches Figma's narrower large text
export const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const Fonts = {
  heading: "var(--font-space-grotesk)",
  body: "var(--font-dm-sans)",
  serif: "'Times New Roman', Times, serif",
  weight: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
} as const;

export default Fonts;
