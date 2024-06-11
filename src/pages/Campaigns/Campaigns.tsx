import PageContainer from "../../components/PageContainer";
import { PlusCircle } from "lucide-react";
import Heading from "@/components/Heading";
import { useCampaignCreateModal } from "@/store/campaignCreateModal";
import CreateCampaign from "./components/CreateCampaign";
import GridView from "../../components/GridView";
import CampaignCard from "./components/CampaignCard";
import { useEffect, useState } from "react";
import { CampaignService } from "@/services/DI/Campaign";
import { useLocation, useNavigate } from "react-router-dom";

const Campaigns = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [campaigns, setCampaigns] = useState<Array<Campaign> | null>(null)
  const setIsOpen = useCampaignCreateModal(state => state.setOpen)
  const IsOpen = useCampaignCreateModal(state => state.isOpen)

  useEffect(() => {
    (async () => {
      const response = await CampaignService.getAll()
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
      setCampaigns(response.data)
    })()
  }, [])

  return (
    <PageContainer>
      <Heading
        title={"Campaigns"}
        action={{
          icon: <PlusCircle className="w-4 h-4 mr-2" />,
          onClick: setIsOpen,
          title: "create",
        }}
      />
      <GridView items={campaigns} component={CampaignCard} />
      {IsOpen && <CreateCampaign />}
    </PageContainer>
  )
}

export default Campaigns