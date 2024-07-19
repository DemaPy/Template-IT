import Heading from "@/components/Heading";
import PageContainer from "@/components/PageContainer";
import { Edit, Trash } from "lucide-react";
import { useParams } from "react-router-dom";
import CampaignTemplateHandler from "./components/CampaignTemplateHandler";
import { useCampaignUpdateModal } from "@/store/campaignUpdateModal";
import UpdateCampaign from "../components/UpdateCampaign";
import { usePreview } from "@/store/preview";
import NavbarBuilder from "./components/NavbarBuilder";
import { useDeleteCampaign, useFetchCampaign } from "./hooks/useCampaign";
import ComponentsSkeleton from "@/pages/Components/components/Skeleton";
import toast from "react-hot-toast";
import Error from "@/pages/Error/Error";

const Campaign = () => {
  const isOpen = usePreview(store => store.isOpen)
  const html = usePreview(store => store.html)

  const params = useParams<{ id: string }>();
  const { isPending: isFetching, isError, data, error } = useFetchCampaign(params.id!)
  const { isPending: isDeleting, mutate } = useDeleteCampaign()

  const setOpen = useCampaignUpdateModal((state) => state.setOpen);

  if (isFetching) return <ComponentsSkeleton />

  if (isError) {
    toast.error(error.message);
    return <Error message={error.message} path="/campaigns" />
  }

  if (!data) {
    toast.error("Unexpected error happend.");
    return
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
              onClick: () => setOpen(),
            },
          ]}
        />
        <UpdateCampaign campaign_id={data.data.id} />
        <CampaignTemplateHandler campaign={data.data} />
      </PageContainer>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-50 z-50 rounded-md">
          <div className="p-4">
            <NavbarBuilder html={html} campaign={data.data} />
          </div>
          <iframe srcDoc={html} className="fixed h-full w-full">
          </iframe>
        </div>
      )}
    </>
  );
};

export default Campaign;
