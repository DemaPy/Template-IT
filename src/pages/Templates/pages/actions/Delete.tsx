import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useDeleteTemplate } from "../hooks/useTemplate";

export const Delete = ({ template_id }: { template_id: Template["id"] }) => {
  const { isPending, mutate } = useDeleteTemplate();

  return (
    <Button size={"sm"} disabled={isPending} onClick={() => mutate({ id: template_id })}>
      <Trash className="w-4 h-4 text-red-400" />
    </Button>
  );
};
