import Heading from "@/components/Heading";
import PageContainer from "@/components/PageContainer";
import { Edit, Trash } from "lucide-react";
import { useParams } from "react-router-dom";
import CampaignTemplateHandler from "./components/CampaignTemplateHandler";
import UpdateCampaign from "../components/Update/UpdateCampaign";
import { usePreview } from "@/store/preview";
import { useDeleteCampaign, useFetchCampaign } from "./hooks/useCampaign";
import Error from "@/pages/Error/Error";
import PreviewPage from "./components/PreviewPage";
import { useState } from "react";
import CampaignSkeleton from "../components/CampaignSkeleton";

const Campaign = () => {
  const [isOpen, setIsOpen] = useState(false)
  const isPreviewOpen = usePreview(store => store.isOpen)
  const html = usePreview(store => store.html)

  const params = useParams<{ id: string }>();
  const { isPending: isFetching, isError, data, error } = useFetchCampaign(params.id!)
  const { isPending: isDeleting, mutate } = useDeleteCampaign()

  if (isFetching) return <CampaignSkeleton />

  if (isError) {
    return <Error error={error} message={error.message} path="/campaigns" />
  }

  return (
    <>
      <PageContainer>
        <Heading
          title={data.data.title}
          action={{
            isLoading: isDeleting,
            icon: <Trash className="w-4 h-4" />,
            onClick: () => mutate({ id: data.data.id }),
          }}
          actions={[
            {
              icon: <Edit className="w-4 h-4" />,
              onClick: () => setIsOpen(true),
            },
          ]}
        />
        {isOpen && (
          <UpdateCampaign isOpen={isOpen} setClose={() => setIsOpen(false)} campaign_id={data.data.id} />
        )}
        <CampaignTemplateHandler campaign={data.data} />
      </PageContainer>
      {isPreviewOpen && (
        <PreviewPage campaign={data.data} html={html} />
      )}
    </>
  );
};

export default Campaign;
