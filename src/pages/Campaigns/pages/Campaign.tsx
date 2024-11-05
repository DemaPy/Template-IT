import PageContainer from "@/components/PageContainer";
import { useParams } from "react-router-dom";
import CampaignTemplateHandler from "./components/CampaignTemplateHandler";
import { usePreview } from "@/store/preview";
import PreviewPage from "./components/PreviewPage";
import CampaignSkeleton from "../components/CampaignSkeleton";
import Flex from "@/components/Layout/Flex";
import Title from "@/components/Title";
import { Actions } from "../Actions/Actions";
import { FetchCampaign } from "../components/Update/FetchCampaign";

const Campaign = () => {
  const isPreviewOpen = usePreview((store) => store.isOpen);
  const html = usePreview((store) => store.html);
  const params = useParams<{ id: string }>();

  return (
    <>
      <PageContainer>
        <FetchCampaign skeleton={<CampaignSkeleton />} campaign_id={params.id!}>
          {(data) => (
            <>
              <Flex direction="row" align="center" justify="between">
                <Title title={data.title} size="md" />
                <Flex direction="row" align="center" justify="between">
                  <Actions campaign_id={data.id} />
                </Flex>
              </Flex>
              <CampaignTemplateHandler campaign={data} />
              {isPreviewOpen && <PreviewPage campaign={data} html={html} />}
            </>
          )}
        </FetchCampaign>
      </PageContainer>
    </>
  );
};

export default Campaign;
