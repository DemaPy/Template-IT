import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCreateCampaign } from "../../pages/hooks/useCampaign";
import { useState } from "react";
import TemplateSelect from "@/components/TemplateSelect";
import { FetchTemplates } from "@/pages/Templates/components/ListTempaltes/FetchTemplates";
import { SelectSkeleton } from "@/components/Skeletons/SelectSkeleton";

const CreateCampaign = ({ isOpen, setClose }: TCreateCampaign) => {
  const [title, setTitle] = useState("");
  const [template_id, setTemplateId] = useState<string>("");

  const { isPending, isError, mutate } = useCreateCampaign();

  if (isError) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create campaign</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 flex-col">
            <Label htmlFor="name" className="text-left">
              Title
            </Label>
            <Input
              id="name"
              placeholder="campaign title"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              className="col-span-4"
            />
          </div>
          <div className="flex gap-2 flex-col">
            <Label htmlFor="template_id" className="text-left">
              Template
            </Label>
            <FetchTemplates skeleton={<SelectSkeleton />}>
              {(data) => (
                <TemplateSelect
                  data={data}
                  template_id={template_id}
                  isLoading={isPending}
                  onSelect={(id) => setTemplateId(id)}
                />
              )}
            </FetchTemplates>
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={isPending}
            onClick={() =>
              mutate({
                title: title,
                templateId: template_id,
              })
            }
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaign;
