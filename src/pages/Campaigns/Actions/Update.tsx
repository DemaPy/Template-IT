import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import InputSkeleton from "@/components/Skeletons/InputSkeleton";
import Update from "@/components/Update";
import { useCampaignUpdate } from "../pages/hooks/useCampaign";
import { FetchCampaign } from "../components/FetchCampaign";
import { UpdateCampaignProps } from "../types/UpdateCampaign";

export const UpdateCampaign = ({ campaign_id }: UpdateCampaignProps) => {
  const { isPending, mutate } = useCampaignUpdate({
    invalidate_key: [campaign_id],
  });

  const [title, setTitle] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update template</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FetchCampaign skeleton={<InputSkeleton />} campaign_id={campaign_id}>
            {(data) => (
              <Update
                fields={[
                  {
                    title: "Title",
                    defaultValue: data.title,
                    name: "name",
                    onChange: (title) => setTitle(title),
                  },
                ]}
              />
            )}
          </FetchCampaign>
        </div>
        <DialogFooter>
          <Button
            onClick={() => mutate({ title: title, id: campaign_id })}
            disabled={isPending}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
