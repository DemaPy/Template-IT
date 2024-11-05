import { UpdateDialogProps } from "../../../types/UpdateSection";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { FetchSectionToUpdate } from "./FetchSectionToUpdate";

const UpdateDialog = ({ section_id, template_id }: UpdateDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"default"}>
          <Edit className="w-4 h-4 text-yellow-400" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update</DialogTitle>
        </DialogHeader>
        <FetchSectionToUpdate
          section_id={section_id}
          template_id={template_id}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;