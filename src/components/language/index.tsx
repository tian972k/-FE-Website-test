"use client";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@app/i18n/routing.public";
import { Locale } from "@app/i18n/config";
import { cn } from "@app/lib/utils";

const Language = ({ className = "" }: { className?: string }) => {
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex h-9 w-[100px] items-center rounded-full bg-gray-200 p-1">
        {/* Sliding indicator */}
        <span
          className={cn(
            "absolute h-7 w-12 rounded-full bg-primary transition-transform duration-200 ease-in-out",
            currentLocale === "en" ? "translate-x-0" : "translate-x-[44px]",
          )}
        />
        {/* Language links with labels */}
        <Link
          href={pathname}
          locale="en"
          className="absolute left-0 z-10 flex h-full w-1/2 items-center justify-center"
          aria-label="Switch to English"
        >
          <span
            className={cn(
              "relative z-20 text-xs font-medium",
              currentLocale === "en" ? "text-white" : "text-gray-500",
            )}
          >
            EN
          </span>
        </Link>
        <Link
          href={pathname}
          locale="fr"
          className="absolute right-0 z-10 flex h-full w-1/2 items-center justify-center"
          aria-label="Switch to French"
        >
          <span
            className={cn(
              "relative z-20 text-xs font-medium",
              currentLocale === "fr" ? "text-white" : "text-gray-500",
            )}
          >
            FR
          </span>
        </Link>
      </div>
    </div>
  );
};
export default Language;
