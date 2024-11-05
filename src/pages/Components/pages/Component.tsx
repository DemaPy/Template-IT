import PageContainer from "@/components/PageContainer";
import { useParams } from "react-router-dom";
import ComponentHandler from "./components/ComponentHandler";
import Flex from "@/components/Layout/Flex";
import Title from "@/components/Title";
import { FetchComponent } from "../components/FetchComponent";
import { Actions } from "../components/Actions";
import { ErrorPage } from "@/pages/Error/Error";
import ComponentSkeleton from "../components/ComponentSkeleton";

const Component = () => {
  const params = useParams<{ id: string }>();
  return (
    <PageContainer>
      <FetchComponent
        errorSkeleton={
          <ErrorPage message={"Component fetching error."} path="/components" />
        }
        loadingSkeleton={<ComponentSkeleton />}
        component_id={params.id!}
      >
        {(data) => (
          <>
            <Flex direction="row" align="center" justify="between">
              <Title title={data.title} size="md" />
              <Flex direction="row" align="center" justify="between">
                <Actions component_id={data.id} />
              </Flex>
            </Flex>
            <ComponentHandler component={data} />
          </>
        )}
      </FetchComponent>
    </PageContainer>
  );
};

export default Component;
