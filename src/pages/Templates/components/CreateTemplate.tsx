import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateTemplate } from "../pages/hooks/useTemplate";
import { CirclePlus } from "lucide-react";
import { FormTitle } from "@/components/MustacheEditor/FormTitle";

const CreateTemplate = () => {
  const [title, setTitle] = useState("");
  const { isPending, mutate } = useCreateTemplate();

  const handleCreate = () => {
    mutate({
      title: title,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create template</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FormTitle setTitle={(title) => setTitle(title)} title={title} />
        </div>
        <DialogFooter>
          <Button disabled={isPending} onClick={handleCreate}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTemplate;
