import ListView from "@/components/List";
import Section from "./Section/Section";
import CreateSection from "./Section/CreateSection";
import ComponentSelect from "../../../../components/ComponentSelect";
import { FetchComponents } from "@/pages/Components/components/FetchComponents";
import { SelectSkeleton } from "@/components/Skeletons/SelectSkeleton";

type Props = {
  sections: Section[] | null;
  template_id: string;
};

const Sidebar = ({ sections, template_id }: Props) => {
  return (
    <div className="lg:w-3/4 w-full relative max-h-[80vh] overflow-y-auto">
      <div className="flex lg:flex-row flex-col gap-2 items-center sticky top-0">
        <CreateSection template_id={template_id} />
        <FetchComponents skeleton={<SelectSkeleton />}>
          {(data) => <ComponentSelect data={data} template_id={template_id} />}
        </FetchComponents>
      </div>
      <div className="mt-4">
        <ListView component={Section} items={sections} />
      </div>
    </div>
  );
};

export default Sidebar;
