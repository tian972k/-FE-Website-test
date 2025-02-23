import Icon, { IconName, SvgIconProps } from "@app/components/icon";
import { cn } from "@app/lib/utils";
import React from "react";

const FooterIcon = (props: SvgIconProps) => {
  return <Icon {...props} className={cn("footer-icon", props.className)} />;
};

export default FooterIcon;
