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

const Components = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [components, setComponents] = useState<Array<Component> | null>(null)
    const setIsOpen = useComponentCreateModal(state => state.setOpen)
    const component = useComponentUpdateModal(state => state.component)

    useEffect(() => {
        (async () => {
            const response = await ComponentService.getAll()
            if (response.status === "error") {
                console.warn(response.message)
                if (response.code === 401) {
                    navigate(`/login?redirect=${location.pathname}`)
                }
                if (response.code === 403) {
                    navigate(`/access-denied`)
                }
                alert(response.message)
            }
            setComponents(response.data)
        })()
    }, [component])

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
    )
}

export default Components