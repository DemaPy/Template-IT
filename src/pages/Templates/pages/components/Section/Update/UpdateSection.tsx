import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FetchSectionToUpdate } from "./FetchSectionToUpdate";
import { TUpdateSection } from "../../../types/UpdateSection";

const UpdateSection = ({
  section_id,
  template_id,
  isOpen,
  setClose,
}: TUpdateSection) => {
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
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
