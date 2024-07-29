import PageContainer from "../../components/PageContainer";
import { PlusCircle } from "lucide-react";
import Heading from "@/components/Heading";
import CreateCampaign from "./components/Create/CreateCampaign";
import GridView from "../../components/GridView";
import CampaignCard from "./components/CampaignCard";
import ComponentsSkeleton from "../Components/components/ComponentsSkeleton";
import { useFetchCampaigns } from "./pages/hooks/useCampaign";
import Error from "../Error/Error";
import { useState } from "react";

const Campaigns = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { data, isError, error, isPending } = useFetchCampaigns()

  if (isPending) return <ComponentsSkeleton />

  if (isError) {
    return <Error error={error} message={error.message} path="/" />
  }

  return (
    <PageContainer>
      <Heading
        title={"Campaigns"}
        action={{
          icon: <PlusCircle className="w-4 h-4 mr-2" />,
          onClick: () => setIsOpen(true),
          title: "create",
        }}
      />
      <GridView items={data.data} component={CampaignCard} />
      {isOpen && (
        <CreateCampaign isOpen={isOpen} setClose={() => setIsOpen(false)} />
      )}
    </PageContainer>
  );
};

export default Campaigns;
