import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import "@app/app/globals.css";
import { Locale } from "@app/i18n/config";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

type Props = {
  children: ReactNode;
  locale: Locale;
};

export default function Document({ children, locale }: Props) {
  return (
    <html className={`${poppins.variable} font-sans`} lang={locale}>
      <body>{children}</body>
    </html>
  );
}
