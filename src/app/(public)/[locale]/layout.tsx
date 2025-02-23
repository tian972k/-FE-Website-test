import { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";
import { Locale, locales } from "@app/i18n/config";
import Document from "@app/components/Document";
import Footer from "@app/components/layout/footer";
import Header from "@app/components/layout/header";
type Props = {
  children: ReactNode;
  params: { locale: Locale };
};

export function generateStaticParams() {
  return locales?.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "FE-test",
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  setRequestLocale(locale);

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <Document locale={locale}>
      <NextIntlClientProvider messages={messages}>
        <Header />
        <div className="min-h-[200px]">{children}</div>
        <Footer />
      </NextIntlClientProvider>
    </Document>
  );
}
