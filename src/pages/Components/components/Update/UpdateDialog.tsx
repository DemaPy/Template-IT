import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { FetchComponentToUpdate } from "./FetchComponentToUpdate";

export const UpdateDialog = ({ component_id }: UpdateFormProps) => {
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
        <FetchComponentToUpdate componet_id={component_id} />
      </DialogContent>
    </Dialog>
  );
};
