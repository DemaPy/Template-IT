import InputSkeleton from "@/components/Skeletons/InputSkeleton";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTemplateUpdate } from "../hooks/useTemplate";
import { useState } from "react";
import { FetchTemplate } from "../components/FetchTemplate";
import Update from "@/components/Update";
import { Button } from "@/components/ui/button";

const LazyUpdateContent = ({
  template_id,
}: {
  template_id: Template["id"];
}) => {
  const { isPending, mutate } = useTemplateUpdate({
    invalidate_key: [template_id],
  });

  const [title, setTitle] = useState("");
  return (
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
  );
};

export default LazyUpdateContent;
