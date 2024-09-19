import { PlusCircle } from "lucide-react";
import { useFetchTemplates } from "./pages/hooks/useTemplate";
import { ErrorPage } from "../Error/Error";
import { useState } from "react";
import {
  CreateTemplate,
  Heading,
  PageContainer,
  PageItemsWrapper,
} from "@/components";
import TemplatesSkeleton from "./components/TemplateSkeleton";
import ListView from "@/components/List";
import TemplateCard from "./components/TemplateCard/TemplateCard";

const Templates = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, isError, error, isPending } = useFetchTemplates();

  if (isPending) return <TemplatesSkeleton />;

  if (isError) {
    return <ErrorPage error={error} message={error.message} path="/" />;
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
        <ListView items={data.data} component={TemplateCard} />
      </PageItemsWrapper>
    </PageContainer>
  );
};

export default Templates;
