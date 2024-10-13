import PageContainer from "../../components/PageContainer";
import ComponentCard from "./components/ComponentCard";
import CreateComponent from "./components/CreateComponent";
import ComponentsSkeleton from "./components/ComponentsSkeleton";
import { GridView, PageItemsWrapper } from "@/components";
import { FetchComponents } from "./components/FetchComponents";
import Flex from "@/components/Layout/Flex";
import Title from "@/components/Title";

const Components = () => {
  return (
    <PageContainer>
      <Flex direction="row" align="center" justify="between">
        <Title title={"Components"} size="md" />
        <CreateComponent />
      </Flex>
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
