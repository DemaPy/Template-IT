import { Label } from "./ui/label";
import { Input } from "./ui/input";

type Field = {
  title: string;
  name: string;
  defaultValue: string;
  onChange: (title: string) => void;
};

type UpdateProps = {
  fields: Field[];
};

const Update = ({ fields }: UpdateProps) => {
  return (
    <>
      {fields.map((item) => {
        return (
          <div key={item.title}>
            <Label htmlFor={item.name} className="text-left">
              {item.title}
            </Label>
            <Input
              id={item.name}
              placeholder="campaign title"
              defaultValue={item.defaultValue}
              className="col-span-4"
              onChange={(ev) => item.onChange(ev.target.value)}
            />
          </div>
        );
      })}
    </>
  );
};

export default Update;
