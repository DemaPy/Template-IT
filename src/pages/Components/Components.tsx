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
  const [loading, setLoading] = useState<boolean>(false)

  const isOpen = useComponentCreateModal(state => state.isOpen)
  const setIsOpen = useComponentCreateModal((state) => state.setOpen);

  const [components, setComponents] = useState<Array<Component>>([]);
  const component = useComponentUpdateModal((state) => state.component);

  useEffect(() => {
    (async () => {
      setLoading(true)
      const response = await ComponentService.getAll();
      const parsed = handleResponse<Component[]>(response, location, navigate);
      if (parsed) {
        setComponents(parsed.data);
      }
      setLoading(false)
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
      {
        isOpen && (
          <CreateComponent />
        )
      }
      <GridView isLoading={loading} items={components} component={ComponentCard} />
    </PageContainer>
  );
};

export default Components;
