import PageContainer from "../../components/PageContainer";
import { PlusCircle } from "lucide-react";
import CreateTemplate from "./components/CreateTemplate";
import GridView from "../../components/GridView";
import TemplateCard from "./components/TemplateCard";
import { useEffect, useState } from "react";
import { TemplateService } from "../../services/DI/Template";
import Heading from "../../components/Heading";
import { useTemplateCreateModal } from "../../store/templateCreateModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useTemplateUpdateModal } from "@/store/templateUpdateModal";
import { handleResponse } from "@/utils/handleResponse";

const Templates = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Array<Template> | null>(null);
  const template = useTemplateUpdateModal((state) => state.template);
  const setIsOpen = useTemplateCreateModal((state) => state.setOpen);
  const IsOpen = useTemplateCreateModal((state) => state.isOpen);

  useEffect(() => {
    (async () => {
      const response = await TemplateService.getAll();
      const parsed = handleResponse<Template[]>(response, location, navigate);
      if (parsed) {
        setTemplates(parsed.data);
      }
    })();
  }, [template]);

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
      <GridView items={templates} component={TemplateCard} />
      {IsOpen && <CreateTemplate />}
    </PageContainer>
  );
};

export default Templates;
