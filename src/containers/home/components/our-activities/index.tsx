"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import Map, { MapRef } from "./components/map";
import Calendar from "./components/calendar";
import ContactForm from "./components/contact";
import Icon, { IconName } from "@app/components/icon";
import { Locale } from "@app/i18n/config";
import Title from "@app/components/ui/title";
import ButtonActives from "./components/button";
import "./styles.css";

type Activity = {
  id: number;
  name: string;
  icon: React.ReactNode;
};

type Props = {
  lang: Locale;
};

const OutActives = ({ lang }: Props) => {
  const t = useTranslations();
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const activitiesIcon = ["Mountains", "Crosshair", "Fishing"];
  const mapRef = useRef<MapRef>(null);
  const activities: Activity[] = t.raw("bloc_2.cases").map((activity: string, index: number) => ({
    id: index + 1,
    name: activity,
    icon: <Icon iconName={activitiesIcon[index] as IconName} className="icon" />,
  }));

  const handleActivityClick = (activityId: number) => {
    setSelectedActivity(activityId);
    mapRef.current?.handleLocationClick(activityId);
  };

  return (
    <>
      {/* MAP */}
      <div className="our-activities">
        <div className="bg-[url('/shutterstock-bg.png')] bg-cover bg-center bg-no-repeat">
          <section className="our-activities-map">
            <Title title={t("bloc_2.title")} />
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 mb-8">
              {activities?.map((activity) => (
                <ButtonActives
                  key={activity.id}
                  onClick={() => handleActivityClick(activity.id)}
                  activity={activity}
                  isSelected={selectedActivity === activity.id}
                />
              ))}
            </div>

            <div className="shadow-lg rounded-[20px] overflow-hidden">
              <Map ref={mapRef} updateSelected={(id) => setSelectedActivity(id)} />
            </div>
          </section>
        </div>
      </div>
      {/* CALENDER */}
      <div>
        <section className="lg:max-w-[1240px] mx-auto lg:py-[60px] px-4 py-[32px]">
          <Title title={t("bloc_2_2.title")} />
          <Calendar
            locale={lang as Locale}
            occupiedDates={["2025-01-28", "2025-01-29", "2025-02-04"]}
          />
          <div className="mt-10">
            <ContactForm />
          </div>
        </section>
      </div>
    </>
  );
};

export default OutActives;
