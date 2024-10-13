import { SectionLayout } from "./SectionLayout";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
type Props = {
  sections: Section[];
  layout: Layout[];
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  isLayoutChanged: boolean;
};

const CampaignLayout = ({
  sections,
  layout,
  moveCard,
  isLayoutChanged,
}: Props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      {layout.map((item, i) => (
        <SectionLayout
          isLayoutChanged={isLayoutChanged}
          section={sections.find((section) => section.id === item.sectionId)!}
          key={item.id}
          index={i}
          moveCard={moveCard}
          {...item}
        />
      ))}
    </DndProvider>
  );
};

export default CampaignLayout;
