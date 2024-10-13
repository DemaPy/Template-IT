import PageContainer from "@/components/PageContainer";
import { useParams } from "react-router-dom";
import ComponentHandler from "./components/ComponentHandler";
import UpdateComponent from "../components/Update/UpdateComponent";
import { useFetchComponent } from "./hooks/useComponent";
import ComponentsSkeleton from "../components/ComponentsSkeleton";
import { ErrorPage } from "@/pages/Error/Error";
import Flex from "@/components/Layout/Flex";
import Title from "@/components/Title";
import { Delete } from "../components/Delete/Delete";

const Component = () => {
  const params = useParams<{ id: string }>();

  const {
    isPending: isFetching,
    data,
    isError,
    error,
  } = useFetchComponent(params.id!);

  if (isFetching) return <ComponentsSkeleton />;

  if (isError) {
    return (
      <ErrorPage error={error} message={error.message} path="/components" />
    );
  }

  return (
    <PageContainer>
      <Flex direction="row" align="center" justify="between">
        <Title title={data.data.title} size="md" />
        <Flex direction="row" align="center" justify="between">
          <UpdateComponent component_id={data.data.id} />
          <Delete component_id={data.data.id} />
        </Flex>
      </Flex>
      <ComponentHandler component={data.data} />
    </PageContainer>
  );
};

export default Component;
