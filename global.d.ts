import en from "./src/messages/en.json";
import { PageData } from "./src/i18n/type";
type Messages = typeof en & PageData;
declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
