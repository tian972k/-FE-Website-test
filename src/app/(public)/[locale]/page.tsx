import HomeContainer from "@app/containers/home";
import { Locale, locales } from "@app/i18n/config";
import React from "react";
type Props = {
  params: { locale: Locale };
};
export function generateStaticParams() {
  return locales?.map((locale) => ({ locale }));
}
const page = ({ params: { locale } }: Props) => {
  return <HomeContainer locale={locale} />;
};

export default page;
