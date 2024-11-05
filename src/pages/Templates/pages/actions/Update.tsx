import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import type { UpdateTemplateProps } from "../../types/UpdateTemplate";
import InputSkeleton from "@/components/Skeletons/InputSkeleton";

const LazyUpdateContent = lazy(() => import("./LazyUpdateContent"));

export const UpdateTemplate = ({ template_id }: UpdateTemplateProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <Edit className="w-4 h-4 text-yellow-300" />
        </Button>
      </DialogTrigger>
      <Suspense fallback={<InputSkeleton />}>
        <LazyUpdateContent template_id={template_id} />
      </Suspense>
    </Dialog>
  );
};
