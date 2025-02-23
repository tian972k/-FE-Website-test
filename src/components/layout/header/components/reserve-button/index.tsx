import Icon from "@app/components/icon";
import { Button } from "@app/components/ui/button";
import React from "react";

type Props = {};

const ReserveButton = (props: Props) => {
  return (
    <Button className="reserve-button text-white rounded-[999px] font-normal text-base gap-2">
      Contactez-nous
      <Icon iconName="ArrowUpRight" className="w-6 h-6" />
    </Button>
  );
};

export default ReserveButton;
