import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TemplatesToSelect } from "./TemplatesToSelect";

type TTemplateSelect = {
  isLoading: boolean;
  template_id: string;
  onSelect: (value: Component["id"]) => void;
  data: Template[];
};

const TemplateSelect = ({
  template_id,
  isLoading,
  onSelect,
  data,
}: TTemplateSelect) => {
  return (
    <Select
      value={template_id}
      disabled={isLoading}
      onValueChange={(id) => {
        if (id === "default") return;
        onSelect(id);
      }}
    >
      <SelectTrigger className="col-span-4">
        <SelectValue placeholder="Select template" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem defaultValue={"Select template"} value={"default"}>
          Select template
        </SelectItem>
        <TemplatesToSelect data={data} />
      </SelectContent>
    </Select>
  );
};

export default TemplateSelect;
