import { Link } from "@app/i18n/routing.public";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export const Header = () => {
  const t = useTranslations();

  return (
    <div className="explore-header">
      <h1 className="explore-title">{t("bloc_3.title")}</h1>
      <Link href="#" className="explore-link">
        {t("bloc_3.more_info")}
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
};
