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

const Component = () => {
  const params = useParams<{ id: string }>();
  const setOpen = useComponentUpdateModal((state) => state.setOpen);
  const isOpen = useComponentUpdateModal((state) => state.isOpen);
  const setComponentStore = useComponentUpdateModal(
    (state) => state.setComponent
  );

  const { isPending: isFetching, data, isError, error } = useFetchComponent(params.id!)
  const { isPending: isDeleting, mutate } = useDeleteComponent()

  if (isFetching) return <ComponentsSkeleton />

  if (isError && !data) {
    return toast.error(error.message);
  }

  if (!data) {
    return toast.error("Unexpected error happend.");
  }

  const handleUpdate = () => {
    setComponentStore(data.data);
    setOpen();
  };

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
            onClick: handleUpdate,
          },
        ]}
      />
      {
        isOpen && (
          <UpdateComponent />
        )
      }
      <ComponentHandler component={data.data} />
    </PageContainer>
  );
};

export default Component;
