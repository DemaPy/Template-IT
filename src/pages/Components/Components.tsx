import PageContainer from "../../components/PageContainer";
import { PlusCircle } from "lucide-react";
import Heading from "@/components/Heading";
import GridView from "../../components/GridView";
import { useEffect, useState } from "react";
import ComponentCard from "./components/ComponentCard";
import { useComponentCreateModal } from "@/store/componentCreateModal";
import CreateComponent from "./components/CreateComponent";
import { ComponentService } from "@/services/DI/Component";
import { useLocation, useNavigate } from "react-router-dom";
import { useComponentUpdateModal } from "@/store/componentUpdateModal";
import { handleResponse } from "@/utils/handleResponse";

const Components = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [components, setComponents] = useState<Array<Component> | null>(null);
  const setIsOpen = useComponentCreateModal((state) => state.setOpen);
  const component = useComponentUpdateModal((state) => state.component);

  useEffect(() => {
    (async () => {
      const response = await ComponentService.getAll();
      const parsed = handleResponse<Component[]>(response, location, navigate);
      if (parsed) {
        setComponents(parsed.data);
      }
    })();
  }, [component]);

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
      <GridView items={components} component={ComponentCard} />
    </PageContainer>
  );
};

export default Components;
