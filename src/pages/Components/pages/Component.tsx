import Heading from "@/components/Heading";
import PageContainer from "@/components/PageContainer";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useComponentUpdateModal } from "@/store/componentUpdateModal";
import ComponentHandler from "./components/ComponentHandler";
import { useNavigate } from "react-router-dom";
import { ComponentService } from "@/services/DI/Component";
import UpdateComponent from "../components/UpdateComponent";
import { handleResponse } from "@/utils/handleResponse";

const Component = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const setOpen = useComponentUpdateModal((state) => state.setOpen);
  const setComponentStore = useComponentUpdateModal(
    (state) => state.setComponent
  );
  const _component = useComponentUpdateModal((state) => state.component);
  const params = useParams<{ id: string }>();
  const [component, setComponent] = useState<Component | null>();

  if (!("id" in params)) return null;

  useEffect(() => {
    (async () => {
      const response = await ComponentService.getOne(params.id!);
      const parsed = handleResponse<Component>(response, location, navigate);
      if (parsed) {
        setComponent(parsed.data);
      } else {
        navigate("/components");
      }
    })();
  }, [_component]);

  if (!component) return null

  const handleDelete = async () => {
    const response = await ComponentService.delete(component.id!);
    if (response) {
      navigate("/components");
    }
  };

  const handleUpdate = () => {
    setComponentStore(component);
    setOpen();
  };

  return (
    <PageContainer>
      <Heading
        title={component.title}
        action={{
          icon: <Trash className="w-4 h-4 text-red-400" />,
          onClick: handleDelete,
        }}
        actions={[
          {
            icon: <Edit className="w-4 h-4" />,
            onClick: handleUpdate,
          },
        ]}
      />
      <UpdateComponent />
      <ComponentHandler component={component} />
    </PageContainer>
  );
};

export default Component;
