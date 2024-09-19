import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FetchComponentToUpdate } from "./FetchComponentToUpdate";

const UpdateComponent = ({
  isOpen,
  setClose,
  component_id,
}: TUpdateComponent) => {
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit component</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FetchComponentToUpdate
            setClose={setClose}
            componet_id={component_id}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateComponent;
