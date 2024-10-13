import PageContainer from "../../components/PageContainer";
import { PlusCircle } from "lucide-react";
import ComponentCard from "./components/ComponentCard";
import CreateComponent from "./components/CreateComponent";
import ComponentsSkeleton from "./components/ComponentsSkeleton";
import { useState } from "react";
import { GridView, Heading, PageItemsWrapper } from "@/components";
import { FetchComponents } from "./components/FetchComponents";

const Components = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PageContainer>
      <Heading
        title={"Components"}
        action={{
          icon: <PlusCircle className="w-4 h-4 mr-2" />,
          onClick: () => setIsOpen(true),
          title: "create",
        }}
      />
      {isOpen && (
        <CreateComponent isOpen={isOpen} setClose={() => setIsOpen(false)} />
      )}
      <FetchComponents skeleton={<ComponentsSkeleton />}>
        {(data) => (
          <PageItemsWrapper>
            <GridView items={data} component={ComponentCard} />
          </PageItemsWrapper>
        )}
      </FetchComponents>
    </PageContainer>
  );
};

export default Components;
