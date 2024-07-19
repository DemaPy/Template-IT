import Heading from "@/components/Heading";
import PageContainer from "@/components/PageContainer";
import { Edit, Trash } from "lucide-react";
import { useParams } from "react-router-dom";
import { useComponentUpdateModal } from "@/store/componentUpdateModal";
import ComponentHandler from "./components/ComponentHandler";
import UpdateComponent from "../components/UpdateComponent";
import toast from "react-hot-toast";
import { useDeleteComponent, useFetchComponent } from "./hooks/useComponent";
import ComponentsSkeleton from "../components/Skeleton";
import Error from "@/pages/Error/Error";

const Component = () => {
  const params = useParams<{ id: string }>();
  const setOpen = useComponentUpdateModal((state) => state.setOpen);

  const { isPending: isFetching, data, isError, error } = useFetchComponent(params.id!)
  const { isPending: isDeleting, mutate } = useDeleteComponent()

  if (isFetching) return <ComponentsSkeleton />

  if (isError) {
    toast.error(error.message);
    return <Error message={error.message} path="/components" />
  }

  if (!data) {
    toast.error("Unexpected error happend.");
    return
  }

  return (
    <PageContainer>
      <Heading
        title={data.data.title}
        action={{
          isLoading: isDeleting,
          icon: <Trash className="w-4 h-4 text-red-400" />,
          onClick: () => mutate(params.id!),
        }}
        actions={[
          {
            icon: <Edit className="w-4 h-4" />,
            onClick: () => setOpen(),
          },
        ]}
      />
      <UpdateComponent component_id={data.data.id} />
      <ComponentHandler component={data.data} />
    </PageContainer>
  );
};

export default Component;
