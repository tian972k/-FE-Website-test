import React from "react";
import HeroBanner from "./components/hero-banner";
import Adventure from "./components/adventure";
import OutActives from "./components/our-activities";
import { Locale } from "@app/i18n/config";
import ExploreMoreWithCookMaster from "./components/explore-more-with-cookMaster";
import DiscoverCookMaster from "./components/discover-cookMaster";
import SocialMedia from "./components/social-media";
import UnforgettableExperiences from "./components/unforgettable-experiences";

type Props = {
  locale: Locale;
};

const HomeContainer = (props: Props) => {
  return (
    <main>
      <HeroBanner />
      <Adventure />
      <OutActives lang={props.locale} />
      <ExploreMoreWithCookMaster />
      <UnforgettableExperiences />
      <SocialMedia locale={props.locale} />
      <DiscoverCookMaster />
    </main>
  );
};

export default HomeContainer;
