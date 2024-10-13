import { Button } from "@/components/ui/button";
import { useDeleteSection } from "../../../hooks/useSection";
import { TrashIcon } from "lucide-react";

type DeleteProps = {
  template_id: Template["id"];
  section_id: Section["id"];
};

export const Delete = ({ template_id, section_id }: DeleteProps) => {
  const { mutate, isPending } = useDeleteSection({
    invalidate_key: template_id,
  });

  return (
    <Button
      disabled={isPending}
      size={"sm"}
      onClick={() => mutate({ id: section_id })}
    >
      <TrashIcon className="w-4 h-4 text-red-400" />
    </Button>
  );
};
