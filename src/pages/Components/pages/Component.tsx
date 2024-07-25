import Heading from "@/components/Heading";
import PageContainer from "@/components/PageContainer";
import { Edit, Trash } from "lucide-react";
import { useParams } from "react-router-dom";
import ComponentHandler from "./components/ComponentHandler";
import UpdateComponent from "../components/UpdateComponent";
import toast from "react-hot-toast";
import { useDeleteComponent, useFetchComponent } from "./hooks/useComponent";
import ComponentsSkeleton from "../components/Skeleton";
import Error from "@/pages/Error/Error";
import { useState } from "react";

const Component = () => {
  const [isEditOpen, setIsEditOpen] = useState(false)

  const params = useParams<{ id: string }>();

  const { isPending: isFetching, data, isError, error } = useFetchComponent(params.id!)
  const { isPending: isDeleting, mutate } = useDeleteComponent()

  if (isFetching) return <ComponentsSkeleton />

  if (isError) {
    toast.error(error.message);
    return <Error error={error} message={error.message} path="/components" />
  }

  if (!data) {
    toast.error("Unexpected error happend.");
    return <Error error={error} message={`Id ${params.id} not found.`} path="/components" />
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
            isLoading: isDeleting,
            icon: <Edit className="w-4 h-4" />,
            onClick: () => setIsEditOpen(true),
          },
        ]}
      />
      {
        isEditOpen && (
          <UpdateComponent isOpen={isEditOpen} setClose={() => setIsEditOpen(false)} component_id={data.data.id} />
        )
      }
      <ComponentHandler component={data.data} />
    </PageContainer>
  );
};

export default Component;
