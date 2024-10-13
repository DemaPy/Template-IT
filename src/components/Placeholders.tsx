import ListView from "@/components/List";
import Title from "@/components/Title";
import Placeholder from "./Placeholder";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  placeholders: Placeholder[];
};

const Placeholders = ({ placeholders }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const isPlaceholders = placeholders.length;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Title title={"Placeholders"} size="xs" />
        <Button
          disabled={!isPlaceholders}
          size={"sm"}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-blue-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-blue-400" />
          )}
        </Button>
      </div>
      {isOpen && <ListView component={Placeholder} items={placeholders} />}
    </div>
  );
};

export default Placeholders;
