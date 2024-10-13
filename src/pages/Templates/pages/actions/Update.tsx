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
import { useTemplateUpdate } from "../../pages/hooks/useTemplate";
import { Edit } from "lucide-react";
import { FetchTemplate } from "../components/FetchTemplate";
import InputSkeleton from "@/components/Skeletons/InputSkeleton";
import Update from "@/components/Update";

export const UpdateTemplate = ({ template_id }: TUpdateTemplate) => {
  const { isPending, mutate } = useTemplateUpdate({
    invalidate_key: [template_id],
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
          <FetchTemplate skeleton={<InputSkeleton />} template_id={template_id}>
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
          </FetchTemplate>
        </div>
        <DialogFooter>
          <Button
            onClick={() => mutate({ title: title, id: template_id })}
            disabled={isPending}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
