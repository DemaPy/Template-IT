import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  placeholders: PlaceholderToCreate[];
  setPlaceholders: (placeholders: PlaceholderToCreate[]) => void;
  setErrorFallback: (err: string) => void;
};
const Placehodlers = ({
  setErrorFallback,
  placeholders,
  setPlaceholders,
}: Props) => {
  const updatePlacehodler = ({ title, fallback }: PlaceholderToCreate) => {
    if (fallback.length < 3) {
      setErrorFallback("Fallback too short.");
    } else {
      setErrorFallback("");
    }

    setPlaceholders(
      placeholders.map((item: PlaceholderToCreate) => {
        if (item.title.toLowerCase() === title.toLowerCase()) {
          return {
            ...item,
            fallback: fallback,
          };
        }
        return item;
      })
    );
  };

  return (
    <>
      {placeholders.map((placeholder) => (
        <Placeholder
          onUpdate={updatePlacehodler}
          placeholder={placeholder}
          key={placeholder.title}
        />
      ))}
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
          value={placeholder.fallback}
          placeholder="add fallback value"
        />
      </div>
    </div>
  );
}

export default Placehodlers;
