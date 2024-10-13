import { PlusCircle } from "lucide-react";
import { useState } from "react";
import {
  CreateTemplate,
  Heading,
  PageContainer,
  PageItemsWrapper,
} from "@/components";
import ListView from "@/components/List";
import TemplateCard from "./components/TemplateCard/TemplateCard";
import { FetchTemplates } from "./components/ListTempaltes/FetchTemplates";

const Templates = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <PageContainer>
      <Heading
        title={"Templates"}
        action={{
          icon: <PlusCircle className="w-4 h-4 mr-2" />,
          onClick: () => setIsOpen(true),
          title: "create",
        }}
      />
      {isOpen && (
        <CreateTemplate isOpen={isOpen} setClose={() => setIsOpen(false)} />
      )}
      <FetchTemplates>
        {(data) => (
          <PageItemsWrapper>
            <ListView items={data.data} component={TemplateCard} />
          </PageItemsWrapper>
        )}
      </FetchTemplates>
    </PageContainer>
  );
};

export default Templates;
