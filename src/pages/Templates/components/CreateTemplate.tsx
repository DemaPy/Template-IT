import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Suspense, useState } from "react";
import { useCreateTemplate } from "../pages/hooks/useTemplate";
import { CirclePlus } from "lucide-react";
import { lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FormTitle = lazy(() => import("@/components/MustacheEditor/FormTitle"));

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
        <Button size={"sm"}>
          <CirclePlus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create template</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Suspense fallback={<Skeleton className="h-[40px] w-full" />}>
            <FormTitle setTitle={(title) => setTitle(title)} title={title} />
          </Suspense>
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
