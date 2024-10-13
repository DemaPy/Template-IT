import { SelectItem } from "./ui/select";

export function ComponentsToSelect({ data }: { data: Component[] }) {
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
