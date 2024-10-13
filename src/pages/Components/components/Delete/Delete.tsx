import { Button } from "@/components/ui/button";
import { useDeleteComponent } from "../../pages/hooks/useComponent";
import { Trash } from "lucide-react";

export const Delete = ({ component_id }: { component_id: Component["id"] }) => {
  const { isPending, mutate } = useDeleteComponent();

  return (
    <Button size={"sm"} disabled={isPending} onClick={() => mutate({ id: component_id })}>
      <Trash className="w-4 h-4 text-red-400" />
    </Button>
  );
};
