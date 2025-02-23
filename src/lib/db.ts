import { cookies } from "next/headers";
import { defaultLocale, Locale } from "../i18n/config";

// This cookie name is used by `next-intl` on the public pages too. By
// reading/writing to this locale, we can ensure that the user's locale
// is consistent across public and private pages. In case you save the
// locale of registered users in a database, you can of course also use
// that instead when the user is logged in.
const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale(): Promise<Locale> {
  return (cookies().get(COOKIE_NAME)?.value as Locale) || defaultLocale;
}
// server component only
export async function setUserLocale(locale: Locale) {
  cookies().set(COOKIE_NAME, locale);
}
