import React, { SVGProps, memo } from "react";
import Icons from "./store";

export type IconName = keyof typeof Icons;

export interface SvgIconProps extends SVGProps<SVGSVGElement> {
  iconName: IconName;
}

const SvgIcon: React.FC<SvgIconProps> = ({ iconName, ...props }) => {
  const IconComponent = Icons[iconName] as React.FC<SVGProps<SVGSVGElement> & any>;

  if (!IconComponent) {
    return (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
      </svg>
    );
  }

  return <IconComponent {...props} />;
};

export default memo(SvgIcon);
