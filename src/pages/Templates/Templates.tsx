import PageContainer from "../../components/PageContainer";
import { PlusCircle } from "lucide-react";
import CreateTemplate from "./components/CreateTemplate";
import GridView from "../../components/GridView";
import TemplateCard from "./components/TemplateCard";
import Heading from "../../components/Heading";
import { useFetchTemplates } from "./pages/hooks/useTemplate";
import ComponentsSkeleton from "../Components/components/Skeleton";
import Error from "../Error/Error";
import { useState } from "react";

const Templates = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { data, isError, error, isPending } = useFetchTemplates()

  if (isPending) return <ComponentsSkeleton />

  if (isError) {
    return <Error error={error} message={error.message} path="/" />
  }

  return (
    <PageContainer>
      <Heading
        title={"Templates"}
        action={{
          icon: <PlusCircle className="w-4 h-4 mr-2" />,
          onClick: () => setIsOpen(false),
          title: "create",
        }}
      />
      {isOpen && (
        <CreateTemplate isOpen={isOpen} setClose={() => setIsOpen(false)} />
      )}
      <GridView items={data.data} component={TemplateCard} />
    </PageContainer>
  );
};

export default Templates;
