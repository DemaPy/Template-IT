import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useState } from "react";
import { ComponentsToSelect } from "@/components/ComponentsToSelect";
import { SelectSkeleton } from "./Skeletons/SelectSkeleton";
import toast from "react-hot-toast";
import { useCreateFromComponent } from "@/pages/Templates/pages/hooks/useSection";

type TComponentSelect = {
  template_id: Template["id"];
  data: Component[];
};

const ComponentSelect = ({ data, template_id }: TComponentSelect) => {
  const [component, setComponent] = useState<Component["id"]>("");
  const { isPending, mutate, isError, error } = useCreateFromComponent({
    invalidate_key: template_id,
  });

  const onSelect = useCallback(
    (value: Component["id"]) => {
      mutate({
        componentId: value,
        templateId: template_id,
      });
    },
    [template_id]
  );

  useEffect(() => {
    if (isError) {
      toast.error((error as Error).message);
    }
  }, [isError, error]);

  if (isPending) return <SelectSkeleton />;
  if (isError) return null;

  return (
    <Select
      value={component}
      onValueChange={(id) => {
        if (id === "default") return;
        onSelect(id);
        setComponent("default");
      }}
    >
      <SelectTrigger className="col-span-4">
        <SelectValue placeholder="Select component" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem defaultValue={"Select component"} value={"default"}>
          Select component
        </SelectItem>
        <ComponentsToSelect data={data} />
      </SelectContent>
    </Select>
  );
};

export default ComponentSelect;
