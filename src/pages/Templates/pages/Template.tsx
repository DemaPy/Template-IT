import Heading from "@/components/Heading";
import PageContainer from "@/components/PageContainer";
import { Edit, Trash } from "lucide-react";
import { useParams } from "react-router-dom";
import TemplateHandler from "./components/TemplateHandler";
import UpdateTemplate from "../components/Update/UpdateTemplate";
import { useDeleteTemplate, useFetchTemplate } from "./hooks/useTemplate";
import Error from "@/pages/Error/Error";
import { useState } from "react";
import TemplateSkeleton from "./components/TemplateSkeleton";

const Template = () => {
  const params = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { isPending: isFetching, isError, data, error } = useFetchTemplate(params.id!)
  const { isPending: isDeleting, mutate } = useDeleteTemplate()

  if (isFetching) return <TemplateSkeleton />

  if (isError) {
    return <Error error={error} message={error.message} path="/templates" />
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
            onClick: () => setIsOpen(true),
          },
        ]}
      />
      {isOpen && (
        <UpdateTemplate isOpen={isOpen} setClose={() => setIsOpen(false)} template_id={data.data.id} />
      )}
      <TemplateHandler template={data.data} />
    </PageContainer>
  );
};

export default Template;
