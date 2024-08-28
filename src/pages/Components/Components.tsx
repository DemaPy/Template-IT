import PageContainer from "../../components/PageContainer";
import { PlusCircle } from "lucide-react";
import ComponentCard from "./components/ComponentCard";
import CreateComponent from "./components/CreateComponent";
import ComponentsSkeleton from "./components/ComponentsSkeleton";
import { useFetchComponents } from "./pages/hooks/useComponent";
import Error from "../Error/Error";
import { useState } from "react";
import { GridView, Heading, PageItemsWrapper } from "@/components";

const Components = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isPending, isError, error } = useFetchComponents();

  if (isPending) return <ComponentsSkeleton />;

  if (isError) {
    return <Error error={error} message={error.message} path="/" />;
  }

  return (
    <PageContainer>
      <Heading
        title={"Components"}
        action={{
          icon: <PlusCircle className="w-4 h-4 mr-2" />,
          onClick: () => setIsOpen(true),
          title: "create",
        }}
      />
      {isOpen && (
        <CreateComponent isOpen={isOpen} setClose={() => setIsOpen(false)} />
      )}
      <PageItemsWrapper>
        <GridView items={data.data} component={ComponentCard} />
      </PageItemsWrapper>
    </PageContainer>
  );
};

export default Components;
