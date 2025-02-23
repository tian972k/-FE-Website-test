import Icon, { IconName } from "@app/components/icon";
import React from "react";
import "./styles.css";
import { useTranslations } from "next-intl";
import { Button } from "@app/components/ui/button";
const HeroBanner = () => {
  const t = useTranslations();
  const bannerMenus = t.raw("banner_menu") as string[];
  const iconBanner = ["Mountains", "Fishing", "Crosshair"];
  const renderBannerMenu = () => {
    return bannerMenus?.map((menu, index) => {
      return (
        <div className="nav-item">
          <Icon iconName={iconBanner[index] as IconName} className="w-6 h-6 md:w-8 md:h-8" />
          <h1 className="text-nav-bar">{menu}</h1>
        </div>
      );
    });
  };
  return (
    <section>
      <div className="container-hero-banner relative">
        <div className="container-nav-bar">
          <nav className="grid grid-cols-3 gap-6">{renderBannerMenu()}</nav>
        </div>
        <div className="container-button-chats">
          <Button className="!rounded-full !aspect-square w-fit h-fit !p-2 md:!p-3">
            <Icon iconName="Chats" className="!w-[18px] !h-[18px] md:!w-7 md:!h-7" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
