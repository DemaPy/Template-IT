import { CopyIcon } from "lucide-react";
import { useDuplicate } from "../../../hooks/useSection";
import { Button } from "@/components/ui/button";

type CopyProps = {
  template_id: Template["id"];
  section_id: Section["id"];
};

export const Copy = ({ template_id, section_id }: CopyProps) => {
  const { mutate, isPending } = useDuplicate({
    invalidate_key: template_id,
  });

  return (
    <Button
      disabled={isPending}
      size={"sm"}
      onClick={() => mutate({ id: section_id })}
    >
      <CopyIcon className="w-4 h-4 text-blue-400" />
    </Button>
  );
};
