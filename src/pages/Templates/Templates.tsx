import { CreateTemplate, PageContainer, PageItemsWrapper } from "@/components";
import ListView from "@/components/List";
import TemplateCard from "./components/TemplateCard/TemplateCard";
import { FetchTemplates } from "./components/ListTempaltes/FetchTemplates";
import { TemplatesSkeleton } from "./components/TemplateSkeleton";
import Title from "@/components/Title";
import Flex from "@/components/Layout/Flex";

const Templates = () => {
  return (
    <PageContainer>
      <Flex direction="row" align="center" justify="between">
        <Title title={"Templates"} size="md" />
        <CreateTemplate />
      </Flex>
      <FetchTemplates skeleton={<TemplatesSkeleton />}>
        {(data) => (
          <PageItemsWrapper>
            <ListView items={data} component={TemplateCard} />
          </PageItemsWrapper>
        )}
      </FetchTemplates>
    </PageContainer>
  );
};

export default Templates;
