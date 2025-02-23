import { useTranslations } from "next-intl";
import React from "react";
import "./footer.css";
import LinkFooter from "./components/Link";
import FooterIcon from "./components/Icon";
const Footer = () => {
  const t = useTranslations();
  const links = t.raw("footer.links") as { name: string; url: string }[];
  const activities = links.slice(0, 3);
  const titles = links.slice(3, 6);
  const additionalLinks = links.slice(6, 8);
  return (
    <footer className="footer-container">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-2 text-center lg:text-left flex flex-col justify-between">
            <h2 className="address">{t("footer.address.name")}</h2>
            <p className="address">{t("footer.address.phone")}</p>
            <p className="address">{t("footer.address.location")}</p>
          </div>

          {/* Activities */}
          <div className="space-y-2">
            {activities?.map((activity) => (
              <LinkFooter key={activity.url} url={`${activity.url}`}>
                {activity.name}
              </LinkFooter>
            ))}
          </div>

          {/* Titles */}
          <div className="space-y-2">
            {titles?.map((title) => (
              <LinkFooter key={title.url} url={`/${title.url}`}>
                {title.name}
              </LinkFooter>
            ))}
          </div>

          {/* Additional Links */}
          <div className="space-y-2">
            {additionalLinks?.map((link) => (
              <LinkFooter key={link.url} url={`/${link.url}`}>
                {link.name}
              </LinkFooter>
            ))}
          </div>
        </div>
        {/* Bottom Section */}
        <div className="mt-12 pt-4 border-t border-[#FFFFFF4D] flex flex-col md:flex-row justify-between items-center">
          <p className="text-white font-normal text-[18px] leading-[24px] tracking-[0px]">
            © BASIC 2024
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <FooterIcon iconName="Facebook" />
            <FooterIcon iconName="Instagram" />
            <FooterIcon iconName="Youtube" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
