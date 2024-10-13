import { PlusCircle } from "lucide-react";
import CreateCampaign from "./components/Create/CreateCampaign";
import CampaignCard from "./components/CampaignCard";
import { useState } from "react";
import {
  GridView,
  Heading,
  PageContainer,
  PageItemsWrapper,
} from "@/components";
import CampaignsSkeleton from "./components/CampaignsSkeleton";
import { FetchCampaigns } from "./components/FetchCampaigns";

const Campaigns = () => {
  const [isOpen, setIsOpen] = useState(false);

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
      <FetchCampaigns skeleton={<CampaignsSkeleton />}>
        {(data) => (
          <PageItemsWrapper>
            <GridView items={data} component={CampaignCard} />
          </PageItemsWrapper>
        )}
      </FetchCampaigns>
    </PageContainer>
  );
};

export default Campaigns;
