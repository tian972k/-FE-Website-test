import { Button, ButtonProps } from "@app/components/ui/button";
import { cn } from "@app/lib/utils";
import React from "react";

interface Activity {
  id: string | number;
  name: string;
  icon: React.ReactNode;
}

interface ButtonActivesProps extends ButtonProps {
  activity: Activity;
  isSelected: boolean;
}

const ButtonActives: React.FC<ButtonActivesProps> = ({
  activity,
  isSelected,
  onClick,
  className,
}) => {
  return (
    <Button onClick={onClick} className={cn("button-actives", className)}>
      {activity.icon} {activity.name}
    </Button>
  );
};

export default ButtonActives;
