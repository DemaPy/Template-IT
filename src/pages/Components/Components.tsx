import PageContainer from "../../components/PageContainer";
import { PlusCircle } from "lucide-react";
import Heading from "@/components/Heading";
import GridView from "../../components/GridView";
import ComponentCard from "./components/ComponentCard";
import { useComponentCreateModal } from "@/store/componentCreateModal";
import CreateComponent from "./components/CreateComponent";
import toast from "react-hot-toast";
import ComponentsSkeleton from "./components/Skeleton";
import { useFetchComponents } from "./pages/hooks/useComponent";
import Error from "../Error/Error";

const Components = () => {
  const setIsOpen = useComponentCreateModal((state) => state.setOpen);

  const { data, isPending, isError, error } = useFetchComponents()

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
        title={"Components"}
        action={{
          icon: <PlusCircle className="w-4 h-4 mr-2" />,
          onClick: setIsOpen,
          title: "create",
        }}
      />
      <CreateComponent />
      <GridView items={data.data} component={ComponentCard} />
    </PageContainer>
  );
};

export default Components;
