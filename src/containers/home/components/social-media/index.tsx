import Icon from "@app/components/icon";
import { Instagram } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import "./styles.css";
import dayjs from "dayjs";
import { Locale } from "@app/i18n/config";
import "dayjs/locale/fr";
import "dayjs/locale/en";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
type Props = {
  locale: Locale;
};

const SocialMedia = ({ locale }: Props) => {
  const t = useTranslations();
  dayjs.locale(locale);
  const reviews = t.raw("bloc_5.reviews") as {
    author: string;
    review: string;
    date: string;
  }[];
  const mainReview = reviews[0];
  const posts = reviews.slice(1, reviews.length);

  const instagramPosts = [
    {
      image: "/social-media-card-image-1.png",
      backgroundColor: "bg-[#ffd4e5]", // Pink
      author: posts[0].author,
    },
    {
      image: "/social-media-card-image-2.png",
      backgroundColor: "bg-[#d4f3e9]", // Mint
      author: posts[1].author,
    },
    {
      image: "/social-media-card-image-3.png",
      backgroundColor: "bg-[#d4e9ff]", // Light blue
      author: posts[2].author,
    },
    {
      image: "/social-media-card-image-4.png",
      backgroundColor: "bg-[#d4e9ff]", // Light blue
      author: posts[3].author,
    },
  ];
  return (
    <section className="social-media">
      <div className="social-media-container">
        <div className="social-media-header">
          <p className="text-[rgba(86, 44, 44, 0.80)] text-sm max-w-[564px] md:text-base flex-1 text-left">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially
          </p>

          <h1 className="text-secondary lg:text-4xl text-2xl font-semibold uppercase flex-1 max-w-[595px] md:text-nowrap text-left w-full md:text-center">
            IMMORTALISEZ DES MOMENTS
            <br />
            INOUBLIABLES AVEC <span className="text-[#ff4d00]">#BASIC</span>
          </h1>
        </div>

        {/* Main post */}
        <div className="main-post">
          <div className="main-post-container">
            <div className="main-post-card">
              <div className="main-post-image">
                <Image
                  src="/share-your-adventures.png"
                  alt="share-your-adventures"
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="main-post-content">
                <div className="main-post-info">
                  <h1 className="main-post-author">{mainReview.author}</h1>
                  <p className="main-post-review-desktop">{mainReview.review}</p>
                </div>
                <div className="main-post-date">
                  {dayjs(mainReview.date, "DD/MM/YYYY")
                    .locale((locale as "en" | "fr") ?? "en")
                    .format("DD MMM YYYY")}
                </div>
              </div>
              <p className="main-post-review-mobile">{mainReview.review}</p>
            </div>
          </div>
        </div>

        <div className="instagram-grid">
          {instagramPosts?.map((post, index) => (
            <div key={index} className={`instagram-post ${post.backgroundColor}`}>
              <div className="instagram-post-wrapper">
                <div className="instagram-post-image">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={`Instagram post ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="instagram-post-overlay">
                  <div className="instagram-post-author">
                    <Instagram className="w-5 h-5" />
                    <span className="text-sm">{post.author}</span>
                  </div>
                  <Icon iconName="ArrowUpRight" className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="social-media-footer">{t("bloc_5.footer")}</div>
      </div>
    </section>
  );
};

export default SocialMedia;
