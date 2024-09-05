import {
  Tooltip as Tltp,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProps } from "./types";

const Tooltip = ({ children, description }: TooltipProps) => {
  return (
    <TooltipProvider>
      <Tltp>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{description}</TooltipContent>
      </Tltp>
    </TooltipProvider>
  );
};

export default Tooltip;
