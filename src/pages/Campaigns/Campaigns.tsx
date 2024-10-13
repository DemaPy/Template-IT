import CreateCampaign from "./components/Create/CreateCampaign";
import CampaignCard from "./components/CampaignCard";
import { GridView, PageContainer, PageItemsWrapper } from "@/components";
import CampaignsSkeleton from "./components/CampaignsSkeleton";
import { FetchCampaigns } from "./components/FetchCampaigns";
import Flex from "@/components/Layout/Flex";
import Title from "@/components/Title";

const Campaigns = () => {
  return (
    <PageContainer>
      <Flex direction="row" align="center" justify="between">
        <Title title={"Campaigns"} size="md" />
        <CreateCampaign />
      </Flex>
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
