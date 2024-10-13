import Placeholders from "../../../../../components/Placeholders";
import Title from "@/components/Title";
import { Actions } from "./Actions";

type Props = {
  item: Section;
  template_id: string;
};

const Section = ({ item }: Props) => {
  return (
    <li className="flex flex-col gap-4 border rounded-md p-2 bg-white">
      <div className="flex justify-between items-center">
        <Title title={item.title} size={"xs"} />
        <Actions template_id={item.templateId} section_id={item.id} />
      </div>
      <Placeholders placeholders={item.placeholders} />
    </li>
  );
};

export default Section;
