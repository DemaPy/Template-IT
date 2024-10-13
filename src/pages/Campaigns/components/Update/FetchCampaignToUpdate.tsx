import { useEffect } from "react";
import { useFetchCampaign } from "../../pages/hooks/useCampaign";
import type { FetchCampaignToUpdateProps } from "../../types/UpdateCampaign";
import toast from "react-hot-toast";

export function FetchCampaign({
  children,
  skeleton,
  campaign_id,
}: FetchCampaignToUpdateProps) {
  const { isPending, data, isError, error } = useFetchCampaign(campaign_id);
  useEffect(() => {
    if (isError) {
      toast.error((error as Error).message);
    }
  }, [isError, error]);

  if (isPending) return skeleton;
  if (isError) return null;

  return <>{children(data.data)}</>;
}
