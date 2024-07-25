import PageContainer from "../../components/PageContainer";
import { PlusCircle } from "lucide-react";
import Heading from "@/components/Heading";
import { useCampaignCreateModal } from "@/store/campaignCreateModal";
import CreateCampaign from "./components/CreateCampaign";
import GridView from "../../components/GridView";
import CampaignCard from "./components/CampaignCard";
import ComponentsSkeleton from "../Components/components/Skeleton";
import { useFetchCampaigns } from "./pages/hooks/useCampaign";
import toast from "react-hot-toast";
import Error from "../Error/Error";

const Campaigns = () => {
  const setIsOpen = useCampaignCreateModal((state) => state.setOpen);

  const { data, isError, error, isPending } = useFetchCampaigns()

  if (isPending) return <ComponentsSkeleton />

  if (isError) {
    toast.error(error.message);
    return <Error error={error} message={error.message} path="/" />
  }

  if (!data) {
    toast.error("Unexpected error happend.");
    return <Error error={error} message={`Unexpected error happend for Campaigns.tsx`} path="/" />
  }

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
      <GridView items={data.data} component={CampaignCard} />
      <CreateCampaign />
    </PageContainer>
  );
};

export default Campaigns;
