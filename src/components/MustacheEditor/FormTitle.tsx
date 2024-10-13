import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormTitleProps = {
  title: Section["title"];
  setTitle: (title: Section["title"]) => void;
};

export const FormTitle = ({ title, setTitle }: FormTitleProps) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-left">
        Name
      </Label>
      <Input
        placeholder="title"
        id="name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        className="col-span-4"
      />
    </div>
  );
};
