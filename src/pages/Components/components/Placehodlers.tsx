import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  placeholders: Placeholder[];
  setPlaceholders: (placeholders: Placeholder[]) => void;
  setErrorFallback: (err: string) => void;
};
const Placehodlers = ({
  setErrorFallback,
  placeholders,
  setPlaceholders,
}: Props) => {
  const updatePlacehodler = ({ id, fallback }: Placeholder) => {
    if (fallback.length < 3) {
      setErrorFallback("Fallback too short.");
    } else {
      setErrorFallback("");
    }

    setPlaceholders(
      placeholders.map((item: Placeholder) => {
        if (item.id === id) {
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
          key={placeholder.id}
        />
      ))}
    </>
  );
};

function Placeholder({
  placeholder,
  onUpdate,
}: {
  onUpdate: (value: Placeholder) => void;
  placeholder: Placeholder;
}) {
  const { title, id, fallback } = placeholder;

  return (
    <div className="flex items-stretch justify-between gap-2">
      <div className="grow">
        <Label>Title</Label>
        <Input
          disabled
          onChange={(ev) =>
            onUpdate({ fallback: fallback, title: ev.target.value, id })
          }
          value={title}
          placeholder="title"
        />
      </div>
      <div className="grow">
        <Label>Fallback</Label>
        <Input
          onChange={(ev) => {
            onUpdate({ fallback: ev.target.value, title, id });
          }}
          value={placeholder.fallback}
          placeholder="add fallback value"
        />
      </div>
    </div>
  );
}

export default Placehodlers;
