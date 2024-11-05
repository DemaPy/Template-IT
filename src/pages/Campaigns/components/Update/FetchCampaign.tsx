import { useEffect } from "react";
import { useFetchCampaign } from "../../pages/hooks/useCampaign";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthError } from "@/services/Errors/AuthError";
import { ErrorPage } from "@/pages/Error/Error";
import type { FetchCampaignProps } from "../../types/FetchCampaign";

export function FetchCampaign({
  children,
  skeleton,
  campaign_id,
}: FetchCampaignProps) {
  const navigate = useNavigate();
  const { isPending, data, isError, error } = useFetchCampaign(campaign_id);
  useEffect(() => {
    if (isError) {
      toast.error((error as Error).message);
    }
    if (error instanceof AuthError) {
      navigate("/login");
      return;
    }
  }, [isError, error]);

  if (isPending) return skeleton;
  if (isError) return <ErrorPage path="/campaigns" message={error?.message} />;
  if (!data.data) return <ErrorPage path="/campaigns" message={"Something went wrong."} />;

  return <>{children(data.data)}</>;
}
