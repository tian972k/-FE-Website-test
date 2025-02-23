import { Link } from "@app/i18n/routing.public";
import { cn } from "@app/lib/utils";
import React from "react";

type Props = {
  url: string;
  children: React.ReactNode | string;
  className?: string;
};

const LinkFooter = (props: Props) => {
  return (
    <Link href={props.url} key={props.url} className={cn("footer-link", props.className)}>
      {props.children}
    </Link>
  );
};

export default LinkFooter;
