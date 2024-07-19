import PageContainer from "../../components/PageContainer";
import { PlusCircle } from "lucide-react";
import CreateTemplate from "./components/CreateTemplate";
import GridView from "../../components/GridView";
import TemplateCard from "./components/TemplateCard";
import Heading from "../../components/Heading";
import { useTemplateCreateModal } from "../../store/templateCreateModal";
import { useFetchTemplates } from "./pages/hooks/useTemplate";
import toast from "react-hot-toast";
import ComponentsSkeleton from "../Components/components/Skeleton";
import Error from "../Error/Error";

const Templates = () => {
  const setIsOpen = useTemplateCreateModal((state) => state.setOpen);

  const { data, isError, error, isPending } = useFetchTemplates()

  if (isPending) return <ComponentsSkeleton />

  if (isError) {
    toast.error(error.message);
    return <Error message={error.message} path="/" />
  }

  if (!data) {
    toast.error("Unexpected error happend.");
    return
  }

  return (
    <PageContainer>
      <Heading
        title={"Templates"}
        action={{
          icon: <PlusCircle className="w-4 h-4 mr-2" />,
          onClick: setIsOpen,
          title: "create",
        }}
      />
      <GridView items={data.data} component={TemplateCard} />
      <CreateTemplate />
    </PageContainer>
  );
};

export default Templates;
