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
import {ErrorPage} from "@/pages/Error/Error";
import TemplateSelect from "@/components/TemplateSelect";

const CreateCampaign = ({ isOpen, setClose }: TCreateCampaign) => {
  const [title, setTitle] = useState("");
  const [template_id, setTemplateId] = useState<string>("");

  const { isPending, isError, error, mutate } = useCreateCampaign();

  if (isError) {
    return <ErrorPage error={error} message={error.message} path="/campaigns" />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create campaign</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
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
            <Label htmlFor="template_id" className="text-left">
              Template
            </Label>
            <TemplateSelect template_id={template_id} isLoading={isPending} onSelect={(id) => setTemplateId(id)} />
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
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaign;
