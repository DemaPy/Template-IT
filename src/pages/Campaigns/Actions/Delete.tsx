import { Button } from "@/components/ui/button";
import { useDeleteCampaign } from "../pages/hooks/useCampaign";
import { Trash } from "lucide-react";

export const Delete = ({ campaign_id }: { campaign_id: Campaign["id"] }) => {
  const { isPending, mutate } = useDeleteCampaign();

  return (
    <Button
      size={"sm"}
      disabled={isPending}
      onClick={() => mutate({ id: campaign_id })}
    >
      <Trash className="w-4 h-4 text-red-400" />
    </Button>
  );
};
