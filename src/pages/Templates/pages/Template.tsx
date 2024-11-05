import PageContainer from "@/components/PageContainer";
import { useParams } from "react-router-dom";
import TemplateHandler from "./components/TemplateHandler";
import TemplateSkeleton from "./components/TemplateSkeleton";
import Flex from "@/components/Layout/Flex";
import Title from "@/components/Title";
import { FetchTemplate } from "./components/FetchTemplate";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Actions = lazy(() => import("./components/Actions"));

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
                <Suspense
                  fallback={
                    <Flex direction="row">
                      <Skeleton className="h-10 w-10" />
                      <Skeleton className="h-10 w-10" />
                    </Flex>
                  }
                >
                  <Actions template_id={data.id} />
                </Suspense>
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
