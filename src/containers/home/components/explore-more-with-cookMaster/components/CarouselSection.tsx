import { Carousel, CarouselContent, CarouselItem } from "@app/components/ui/carousel";
import { useTranslations } from "next-intl";
export type CarouselItemType = {
  category: string;
  tagline: string;
  description: string;
};
export const CarouselSection = () => {
  const t = useTranslations();
  const items = t.raw("bloc_3.cases") as CarouselItemType[];

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="carousel-wrapper"
    >
      <CarouselContent className="carousel-content">
        {items?.map((item, index) => (
          <CarouselItem key={index} className="carousel-item">
            <div className="space-y-3">
              <img
                src={`/image-food-${index + 1}.png`}
                alt={`Food image ${index + 1}`}
                className="food-image"
              />
              <h3 className="food-category">{item.category}</h3>
              <p className="food-tagline">{item.tagline}</p>
              <p className="food-description text-secondary/80">{item.description}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
