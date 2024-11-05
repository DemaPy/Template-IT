import { useEffect } from "react";
import toast from "react-hot-toast";
import type { FetchCampaignProps } from "../types/FetchCampaign";
import { useFetchCampaign } from "../pages/hooks/useCampaign";
import { ErrorPage } from "@/pages/Error/Error";

export function FetchCampaign({
  children,
  skeleton,
  campaign_id,
}: FetchCampaignProps) {
  const { isPending, isError, data, error } = useFetchCampaign(campaign_id);
  useEffect(() => {
    if (isError) {
      toast.error((error as Error).message);
    }
  }, [isError, error]);

  if (isPending) return skeleton;
  if (isError) return <ErrorPage path="/campaigns" message={error?.message}/>

  return <>{children(data.data)}</>;
}
