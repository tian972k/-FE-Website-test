import Icon from "@app/components/icon";
import { Button } from "@app/components/ui/button";
import { cn } from "@app/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import "./styles.css";
import Title from "@app/components/ui/title";
type CardInfo = {
  category: string;
  cta: string;
  description: string;
  tagline: string;
};
export default function Adventure() {
  const t = useTranslations();
  const cases = t.raw("bloc_1.cases") as CardInfo[];
  const renderCard = () => {
    return (
      <>
        {cases?.map((item, index) => (
          <div
            key={index}
            className={cn("space-y-4 group mt-0", {
              "md:mt-11": index + 1 != 2,
            })}
          >
            <div className="relative aspect-video md:aspect-square overflow-hidden rounded-lg transform transition-all duration-500 ease-in-out group-hover:shadow-[0_0_30px_rgba(255,87,51,0.3)]">
              <Image
                src={`/image-adventure-${index + 1}.png`}
                alt={item.category}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <h2 className="text-primary font-medium text-xs md:text-lg lg:text-xl">
              {item.category}
            </h2>
            <h3 className="text-secondary lg:text-2xl md:text-xl font-medium">{item.tagline}</h3>
            <p className="overflow-hidden text-secondary text-ellipsis text-sm md:text-base lg:text-lg font-normal ">
              {item.description}
            </p>
            <Button className="button-card" variant="second">
              {item.cta}
              <Icon iconName="ArrowUpRight" />
            </Button>
          </div>
        ))}
      </>
    );
  };
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <div className="mb-1 md:mb-4 lg:mb-4">
            <Title title={t("bloc_1.title")} />
          </div>
          <h2 className="font-normal md:text-xl lg:text-2xl text-sm text-center text-secondary/80">
            {t("bloc_1.subtitle")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">{renderCard()}</div>
      </div>
    </div>
  );
}
