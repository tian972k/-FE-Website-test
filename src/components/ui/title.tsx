import React from "react";

type Props = {
  title: string;
};

const Title = ({ title }: Props) => {
  return (
    <div className="relative flex justify-center gap-4 md:gap-10 items-center mb-10">
      <div className="flex-1 md:w-full h-[2px] bg-[#BBB]"></div>
      <h1 className="px-4 text-2xl md:text-3xl lg:text-[52px] lg:leading-[60px] font-semibold text-primary text-wrap text-center md:text-nowrap">
        {title}
      </h1>
      <div className="flex-1 md:w-[200px] h-[2px] bg-[#BBB]"></div>
    </div>
  );
};

export default Title;
