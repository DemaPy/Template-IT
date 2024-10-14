import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  placeholders: PlaceholderToCreate[];
  setPlaceholders: (placeholders: PlaceholderToCreate[]) => void;
  placeholdersRef: {
    current: Record<string, string>
  }
};
const Placehodlers = ({ placeholdersRef, placeholders, setPlaceholders }: Props) => {

  const updatePlacehodler = ({ title, fallback }: PlaceholderToCreate) => {
    const new_placeholders = placeholders.map((item: PlaceholderToCreate) => {
      if (item.title.toLowerCase() === title.toLowerCase()) {
        placeholdersRef.current[item.title] = fallback
        return {
          ...item,
          fallback: fallback,
        };
      }
      placeholdersRef.current[item.title] = item.fallback
      return item;
    })
    setPlaceholders(new_placeholders);
  };
  
  return (
    <>
      {placeholders.map((placeholder) => {
        placeholdersRef.current[placeholder.title] = placeholder.fallback
        return <Placeholder
        onUpdate={updatePlacehodler}
        placeholder={placeholder}
        key={placeholder.title}
      />
      })}
    </>
  );
};

function Placeholder({
  placeholder,
  onUpdate,
}: {
  onUpdate: (value: PlaceholderToCreate) => void;
  placeholder: PlaceholderToCreate;
}) {
  const { title, fallback } = placeholder;

  return (
    <div className="flex items-stretch justify-between gap-2">
      <div className="grow">
        <Label>Title</Label>
        <Input
          disabled
          onChange={(ev) =>
            onUpdate({ fallback: fallback, title: ev.target.value })
          }
          value={title}
          placeholder="title"
        />
      </div>
      <div className="grow">
        <Label>Fallback</Label>
        <Input
          onChange={(ev) => {
            onUpdate({ fallback: ev.target.value, title });
          }}
          value={fallback}
          placeholder="add fallback value"
        />
      </div>
    </div>
  );
}

export default Placehodlers;
