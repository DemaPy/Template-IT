import PageContainer from "@/components/PageContainer";
import { useParams } from "react-router-dom";
import TemplateHandler from "./components/TemplateHandler";
import TemplateSkeleton from "./components/TemplateSkeleton";
import Flex from "@/components/Layout/Flex";
import Title from "@/components/Title";
import { Actions } from "./components/Actions";
import { FetchTemplate } from "./components/FetchTemplate";

const Template = () => {
  const params = useParams<{ id: string }>();

  return (
    <PageContainer>
      <FetchTemplate skeleton={<TemplateSkeleton />} template_id={params.id!}>
        {(data) => (
          <>
            <Flex direction="row" align="center" justify="between">
              <Title title={data.title} size="md" />
              <Flex direction="row" align="center" justify="between">
                <Actions template_id={data.id} />
              </Flex>
            </Flex>
            <TemplateHandler template={data} />
          </>
        )}
      </FetchTemplate>
    </PageContainer>
  );
};

export default Template;
