import Heading from "@/components/Heading"
import PageContainer from "@/components/PageContainer"
import { Edit, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import TemplateHandler from "./components/TemplateHandler"
import { TemplateService } from "@/services/DI/Template"
import { useTemplateUpdateModal } from "@/store/templateUpdateModal"
import UpdateTemplate from "../components/UpdateTemplate"
import { useSectionCreateModal } from "@/store/sectionCreateModal"


const Template = () => {
  const navigate = useNavigate();
  const location = useLocation()

  const params = useParams<{ id: string; }>()
  const [template, setTemplate] = useState<Template | null>(null)

  const section = useSectionCreateModal(state => state.section)

  const setIsOpen = useTemplateUpdateModal(store => store.setOpen)
  const setTemplateUpdate = useTemplateUpdateModal(store => store.setTemplate)
  const updatedTemplate = useTemplateUpdateModal(store => store.template)

  if (!("id" in params)) return null

  useEffect(() => {
    (async () => {
      const response = await TemplateService.getOne(params.id!)
      if (response.status === "error") {
        console.warn(response.message)
        if (response.code === 401) {
          navigate(`/login?redirect=${location.pathname}`)
        }
        if (response.code === 403) {
          navigate(`/access-denied`)
        }
      }
      if (response.data === null) {
        navigate("/templates")
        return
      }
      setTemplate(response.data)
    })()
  }, [updatedTemplate, section])

  if (!template) return null

  const handleUpdate = () => {
    setTemplateUpdate(template)
    setIsOpen()
  }

  const handleDelete = async () => {
    const response = await TemplateService.delete(template.id)
    if (response) {
      navigate("/templates")
    }
  }

  return (
    <PageContainer>
      <Heading
        title={template.title}
        action={
          {
            icon: <Trash className="w-4 h-4" />,
            onClick: handleDelete,
          }}
        actions={[
          {
            icon: <Edit className="w-4 h-4" />,
            onClick: handleUpdate,
          }
        ]}
      />
      <UpdateTemplate />
      <TemplateHandler template={template} />
    </PageContainer>
  )
}

export default Template