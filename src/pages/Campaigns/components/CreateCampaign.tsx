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
import { useCampaignCreateModal } from "@/store/campaignCreateModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetchTemplates } from "@/pages/Templates/pages/hooks/useTemplate";
import ComponentsSkeleton from "@/pages/Components/components/Skeleton";
import toast from "react-hot-toast";
import { useCreateCampaign } from "../pages/hooks/useCampaign";
import { useState } from "react";
import Error from "@/pages/Error/Error";

const CreateCampaign = () => {
  const [title, setTitle] = useState("");
  const [template_id, setTemplateId] = useState<string>("");

  const { data, isError, error, isPending: isFetching } = useFetchTemplates();
  const { isPending, mutate } = useCreateCampaign();

  const isOpen = useCampaignCreateModal((state) => state.isOpen);
  const setClose = useCampaignCreateModal((state) => state.setClose);

  if (isFetching) return <ComponentsSkeleton />;

  if (isError) {
    toast.error(error.message);
    return <Error error={error} message={error.message} path="/campaigns" />;
  }

  if (!data) {
    toast.error("Unexpected error happend.");
    return;
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
            <Select
              value={template_id || ""}
              onValueChange={(value) => setTemplateId(value)}
            >
              <SelectTrigger className="col-span-4">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                {data.data.map((item, idx) => (
                  <SelectItem key={idx} value={item.id.toString()}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
