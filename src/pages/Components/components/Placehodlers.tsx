import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  placeholders: PlaceholderToCreate[];
  setPlaceholders: (placeholders: PlaceholderToCreate[]) => void;

};
const Placehodlers = ({ placeholders, setPlaceholders }: Props) => {

  const updatePlacehodler = ({ title, fallback }: PlaceholderToCreate) => {
    const new_placeholders = placeholders.map((item: PlaceholderToCreate) => {
      if (item.title.toLowerCase() === title.toLowerCase()) {
        return {
          ...item,
          fallback: fallback,
        };
      }
      return item;
    })
    setPlaceholders(new_placeholders);
  };

  return (
    <>
      {placeholders.map((placeholder) => {
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
