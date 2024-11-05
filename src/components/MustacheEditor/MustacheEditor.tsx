import { ChangeEvent } from "react";
import { Textarea } from "../ui/textarea";

type MustacheEditorProps = {
  setContent: (template: string) => void;
  value: string;
};

const MustacheEditor = ({ value, setContent }: MustacheEditorProps) => {
  const handleChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    const template = ev.target.value;
    setContent(template);
  };

  return (
    <>
      <Textarea
        defaultValue={value}
        rows={18}
        className="resize-none hidden md:block"
        onChange={handleChange}
      ></Textarea>
      <Textarea
        defaultValue={value}
        rows={10}
        className="resize-none block md:hidden"
        onChange={handleChange}
      ></Textarea>
    </>
  );
};

export default MustacheEditor;
