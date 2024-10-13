import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type FlexProps = {
  direction: "row" | "col";
  justify: "between";
  align: "center";
};

const Flex = ({
  direction,
  children,
  justify,
  align,
}: FlexProps & PropsWithChildren) => {
  return (
    <div
      className={cn("flex gap-4", {
        ["flex-row"]: direction === "row",
        ["flex-col"]: direction === "col",
        ["justify-between"]: justify === "between",
        ["items-center"]: align === "center",
      })}
    >
      {children}
    </div>
  );
};

export default Flex;
