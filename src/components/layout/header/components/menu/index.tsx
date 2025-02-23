import Icon from "@app/components/icon";
import React from "react";

type Props = {};

const Menu = (props: Props) => {
  return (
    <div className="block lg:hidden">
      <button className="text-white p-[6px] bg-transparent transition-all ease-out hover:bg-primary rounded-full">
        <Icon iconName="Hamburger" />
      </button>
    </div>
  );
};

export default Menu;
