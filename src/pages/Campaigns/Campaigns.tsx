import { PlusCircle } from "lucide-react";
import CreateCampaign from "./components/Create/CreateCampaign";
import CampaignCard from "./components/CampaignCard";
import { useFetchCampaigns } from "./pages/hooks/useCampaign";
import Error from "../Error/Error";
import { useState } from "react";
import {
  GridView,
  Heading,
  PageContainer,
  PageItemsWrapper,
} from "@/components";
import CampaignsSkeleton from "./components/CampaignsSkeleton";

const Campaigns = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isError, error, isPending } = useFetchCampaigns();

  if (isPending) return <CampaignsSkeleton />;

  if (isError) {
    return <Error error={error} message={error.message} path="/" />;
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
      {isOpen && (
        <CreateCampaign isOpen={isOpen} setClose={() => setIsOpen(false)} />
      )}
      <PageItemsWrapper>
        <GridView items={data.data} component={CampaignCard} />
      </PageItemsWrapper>
    </PageContainer>
  );
};

export default Campaigns;
