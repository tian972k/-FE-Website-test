import React from "react";
import Icon from "@app/components/icon";
import { Button } from "@app/components/ui/button";
import { useTranslations } from "next-intl";
export type ExploreMoreProps = {};
import { Header } from "./components/Header";
import { CarouselSection } from "./components/CarouselSection";
import "./styles.css";

const ExploreMoreWithCookMaster = (props: ExploreMoreProps) => {
  const t = useTranslations();

  return (
    <section>
      <div className="explore-container">
        <Header />
        <CarouselSection />
        <Button className="mobile-button">
          {t("bloc_3.more_info")}
          <Icon iconName="ArrowUpRight" className="w-6 h-6" />
        </Button>
      </div>
    </section>
  );
};

export default ExploreMoreWithCookMaster;
