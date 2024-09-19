import ListView from "@/components/List";
import Title from "@/components/Title";
import Placeholder from "./Placeholder";

type Props = {
  placeholders: Placeholder[] | null;
};

const Placeholders = ({ placeholders }: Props) => {
  return (
    <div className="space-y-2">
      <Title title={"Placeholders"} size="xs" />
      <ListView component={Placeholder} items={placeholders} />
    </div>
  );
};

export default Placeholders;
