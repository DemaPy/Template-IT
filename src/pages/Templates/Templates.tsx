import { PlusCircle } from "lucide-react";
import { useFetchTemplates } from "./pages/hooks/useTemplate";
import Error from "../Error/Error";
import { useState } from "react";
import {
  CreateTemplate,
  GridView,
  Heading,
  PageContainer,
  PageItemsWrapper,
  TemplateCard,
} from "@/components";
import TemplatesSkeleton from "./components/TemplateSkeleton";

const Templates = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, isError, error, isPending } = useFetchTemplates();

  if (isPending) return <TemplatesSkeleton />;

  if (isError) {
    return <Error error={error} message={error.message} path="/" />;
  }

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
      <PageItemsWrapper>
        <GridView items={data.data} component={TemplateCard} />
      </PageItemsWrapper>
    </PageContainer>
  );
};

export default Templates;
