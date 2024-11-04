import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCampaignUpdate } from "../../pages/hooks/useCampaign";
import { useState } from "react";
import { FetchCampaign } from "./FetchCampaign";
import InputSkeleton from "@/components/Skeletons/InputSkeleton";
import Update from "@/components/Update";
import type { UpdateCampaignProps } from "../../types/UpdateCampaign";

const UpdateCampaign = ({ campaign_id }: UpdateCampaignProps) => {
  const [title, setTitle] = useState("");
  const { isPending, mutate } = useCampaignUpdate({
    invalidate_key: [campaign_id],
  });

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update campaign</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FetchCampaign campaign_id={campaign_id} skeleton={<InputSkeleton />}>
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
            disabled={isPending}
            onClick={() =>
              mutate({
                title: title,
                id: campaign_id,
              })
            }
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCampaign;
