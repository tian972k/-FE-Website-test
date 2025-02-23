import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales } from "@app/i18n/config";
import { getUserLocale } from "@app/lib/db";
import { HttpRequest } from "@app/lib/http";
async function fetchMessages(locale: string) {
  try {
    const response = await HttpRequest(
      `https://api.test.soa-dev.net/api/v1/pages?lang=${locale}`,
      "GET",
    );

    if (Array.isArray(response) && response.length > 0) {
      return response[0]; // Extract the first object
    }

    return {};
  } catch (error) {
    console.error("Error fetching messages:", error);
    return (await import(`../messages/${locale}.json`)).default;
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  // Read from potential `[locale]` segment
  let locale = await requestLocale;

  if (!locale) {
    // The user is logged in
    locale = await getUserLocale();
  }

  // Ensure that the incoming locale is valid
  if (!locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  const apiMessages = await fetchMessages(locale);
  const localMessages = (await import(`../messages/${locale}.json`)).default;
  const messages = {
    ...localMessages,
    ...apiMessages,
  };
  console.log("🚀 ~ getRequestConfig ~ messages:", messages);
  return {
    locale,
    messages: messages,
  };
});
