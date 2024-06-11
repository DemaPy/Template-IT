import Heading from "@/components/Heading"
import PageContainer from "@/components/PageContainer"
import { Edit, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import { redirect, useParams } from "react-router-dom"
import { useComponentCreateModal } from "@/store/componentCreateModal"
import { useComponentUpdateModal } from "@/store/componentUpdateModal"
import ComponentHandler from "./components/ComponentHandler"
import { useNavigate } from "react-router-dom";
import { ComponentService } from "@/services/DI/Component"

const Component = () => {
    const navigate = useNavigate();

    const setOpen = useComponentCreateModal(state => state.setOpen)
    const setComponentStore = useComponentUpdateModal(state => state.setComponent)
    const _component = useComponentUpdateModal(state => state.component)
    const params = useParams<{ id: string; }>()
    const [component, setComponent] = useState<Component | null>()

    if (!("id" in params)) return null

    useEffect(() => {
        (async () => {
            const response = await ComponentService.getOne(params.id!)
            if (response.error instanceof Error) {
                alert(response.message)
                return
            }
            if (response.data === null) {
                navigate("/components")
                return
            }
            if (response.code === 401) {
                navigate(`/login?redirect=${location.pathname}`)
            }
            if (response.code === 403) {
                navigate(`/access-denied`)
            }
            setComponent(response.data)
        })()
    }, [_component])

    if (!component) return null

    const handleDelete = async () => {
        const response = await ComponentService.delete(component.id!)
        if (response) {
            redirect("/components")
        }
    }

    const handleUpdate = () => {
        setComponentStore(component)
        setOpen()
    }

    return (
        <PageContainer>
            <Heading
                title={component.title}
                action={{
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
            <ComponentHandler component={component} />
        </PageContainer>
    )
}

export default Component