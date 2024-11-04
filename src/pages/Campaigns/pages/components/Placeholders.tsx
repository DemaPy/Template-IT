import ListView from "@/components/List";
import Title from "@/components/Title";
import Placeholder from "./Placeholder";
import Flex from "@/components/Layout/Flex";

type Props = {
  placeholders: Placeholder[] | null;
};

const Placeholders = ({ placeholders }: Props) => {
  return (
    <div>
      <Flex direction="col" gap="2" justify="normal" align="start">
        <Title title={"Placeholders"} size="xs" />
        <div className="max-h-80 overflow-y-auto">
          <ListView component={Placeholder} items={placeholders} />
        </div>
      </Flex>
    </div>
  );
};

export default Placeholders;
