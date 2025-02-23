import { Button } from "@app/components/ui/button";
import { useTranslations } from "next-intl";
import React from "react";
import "./style.css";

const DiscoverCookMaster = () => {
  const t = useTranslations();
  return (
    <section className="discover">
      <div className="discover-overlay bg-gradient-to-b from-[rgba(0, 0, 0, 0)] via-transparent to-[rgba(0, 0, 0, 0.20)]">
        <div className="discover-content">
          <div>
            <h2 className="discover-title">{t("bloc_6.title")}</h2>
            <h2 className="discover-subtitle">{t("bloc_6.subtitle")}</h2>
            <p className="discover-desc">{t("bloc_6.text")}</p>
            <div className="flex justify-center">
              <Button className="discover-btn">{t("bloc_6.button")}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverCookMaster;
