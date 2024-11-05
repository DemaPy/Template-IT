import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type FlexProps = {
  direction: "row" | "col";
  justify?: "between" | "normal"
  align?: "center" | "start" | "base"
  gap?: "2" | "4" | "6";
};

const Flex = ({
  direction,
  children,
  justify = "normal",
  align = "base",
  gap = "2",
}: FlexProps & PropsWithChildren) => {
  return (
    <div
      className={cn("flex", {
        ["flex-row"]: direction === "row",
        ["flex-col"]: direction === "col",
        ["justify-between"]: justify === "between",
        ["justify-normal"]: justify === "normal",
        ["items-center"]: align === "center",
        ["gap-2"]: gap === "2",
        ["gap-4"]: gap === "4",
        ["gap-6"]: gap === "6",
      })}
    >
      {children}
    </div>
  );
};

export default Flex;
