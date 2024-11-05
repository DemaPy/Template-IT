import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { FetchComponent } from "../FetchComponent";
import ComponentUpdateSkeleton from "./ComponentSkeleton";
import UpdateForm from "./UpdateForm";
import ComponentFetchError from "./ComponentFetchError";

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
        <FetchComponent
          component_id={component_id}
          errorSkeleton={<ComponentFetchError />}
          loadingSkeleton={<ComponentUpdateSkeleton />}
        >
          {(data) => {
            return <UpdateForm component={data} />;
          }}
        </FetchComponent>
      </DialogContent>
    </Dialog>
  );
};
