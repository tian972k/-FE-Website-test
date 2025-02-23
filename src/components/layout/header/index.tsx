import React from "react";
import "./header.css";
import { useTranslations } from "next-intl";
import { Link } from "@app/i18n/routing.public";
import Icon from "@app/components/icon";
import Menu from "./components/menu";
import Language from "@app/components/language";
import ReserveButton from "./components/reserve-button";
type Props = {};

const Header = (props: Props) => {
  const t = useTranslations();
  const cases = t.raw("head_menu") as string[];
  const navigationLinks = [
    { href: "/book-class", label: cases[0] },
    { href: "/chefs", label: cases[1] },
    { href: "/packages", label: cases[2] },
    { href: "/blog", label: cases[3] },
  ];
  return (
    <header>
      <div className="header-container">
        <div className="flex lg:gap-6 xl:gap-[93px]">
          <Link href="/" aria-label="Home">
            <h1 className="text-white font-bold text-[15px] leading-[22.5px] tracking-normal">
              LOGO SAMPLE
            </h1>
          </Link>
          <nav className="hidden gap-6 lg:flex" aria-label="Main navigation">
            {navigationLinks?.map((link) => (
              <Link key={link.href} href={link.href} className="header-nav-link">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <div className="hidden lg:flex lg:gap-[20px] items-center">
            <div className="flex gap-4 items-center">
              <Icon
                iconName="Mountains"
                className="text-white hover:text-primary transition-all duration-300 cursor-pointer w-7 h-7"
              />
              <Icon
                iconName="Fishing"
                className="text-white hover:text-primary transition-all duration-300 cursor-pointer w-7 h-7"
              />
              <Icon
                iconName="Crosshair"
                className="text-white hover:text-primary transition-all duration-300 cursor-pointer w-7 h-7"
              />
            </div>
            <div>
              <ReserveButton />
            </div>
            <div>
              <Language className="text-white" />
            </div>
          </div>
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
