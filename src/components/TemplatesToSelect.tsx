import { SelectItem } from "./ui/select";

export function TemplatesToSelect({ data }: { data: Template[] }) {
  return (
    <>
      {data.map((item, idx) => (
        <SelectItem key={idx} value={item.id}>
          {item.title}
        </SelectItem>
      ))}
    </>
  );
}
