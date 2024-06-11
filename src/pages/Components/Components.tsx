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

const Components = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [components, setComponents] = useState<Array<Component> | null>(null)
    const setIsOpen = useComponentCreateModal(state => state.setOpen)


    useEffect(() => {
        (async () => {
            const response = await ComponentService.getAll()
            if (response.error instanceof Error) {
                alert(response.message)
                return
            }
            if (response.code === 401) {
                navigate(`/login?redirect=${location.pathname}`)
            }
            if (response.code === 403) {
                navigate(`/access-denied`)
            }
            setComponents(response.data)
        })()
    }, [])

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