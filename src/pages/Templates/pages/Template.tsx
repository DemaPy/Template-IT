import Heading from "@/components/Heading";
import PageContainer from "@/components/PageContainer";
import { Edit, Trash } from "lucide-react";
import { useParams } from "react-router-dom";
import TemplateHandler from "./components/TemplateHandler";
import { useTemplateUpdateModal } from "@/store/templateUpdateModal";
import UpdateTemplate from "../components/UpdateTemplate";
import { useDeleteTemplate, useFetchTemplate } from "./hooks/useTemplate";
import ComponentsSkeleton from "@/pages/Components/components/Skeleton";
import toast from "react-hot-toast";
import Error from "@/pages/Error/Error";

const Template = () => {
  const params = useParams<{ id: string }>();
  const { isPending: isFetching, isError, data, error } = useFetchTemplate(params.id!)
  const { isPending: isDeleting, mutate } = useDeleteTemplate()

  const setIsOpen = useTemplateUpdateModal((store) => store.setOpen);

  if (isFetching) return <ComponentsSkeleton />

  if (isError) {
    toast.error(error.message);
    return <Error error={error} message={error.message} path="/templates" />
  }

  if (!data.data) {
    toast.error("Unexpected error happend.");
    return <Error error={error} message={`Id ${params.id} not found.`} path="/templates" />
  }

  return (
    <PageContainer>
      <Heading
        title={data.data.title}
        action={{
          isLoading: isDeleting,
          icon: <Trash className="w-4 h-4 text-red-400" />,
          onClick: () => mutate({ id: data.data.id }),
        }}
        actions={[
          {
            icon: <Edit className="w-4 h-4" />,
            onClick: setIsOpen,
          },
        ]}
      />
      <UpdateTemplate template_id={data.data.id} />
      <TemplateHandler template={data.data} />
    </PageContainer>
  );
};

export default Template;
