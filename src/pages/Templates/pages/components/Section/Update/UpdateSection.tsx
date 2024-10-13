import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FetchSectionToUpdate } from "./FetchSectionToUpdate";
import type { UpdateSectionProps } from "../../../types/UpdateSection";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

const UpdateSection = ({ section_id, template_id }: UpdateSectionProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <Edit className="w-4 h-4 text-yellow-400" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit section</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <FetchSectionToUpdate
            section_id={section_id}
            template_id={template_id}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSection;
