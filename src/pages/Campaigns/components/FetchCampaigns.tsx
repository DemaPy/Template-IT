import { ReactElement, useEffect } from "react";
import toast from "react-hot-toast";
import { useFetchCampaigns } from "../pages/hooks/useCampaign";

export const FetchCampaigns = ({
  children,
  skeleton,
}: {
  skeleton: ReactElement;
  children: (data: Campaign[]) => ReactElement;
}) => {
  const { data, isPending, isError, error } = useFetchCampaigns();
  useEffect(() => {
    if (isError) {
      toast.error((error as Error).message);
    }
  }, [isError, error]);

  if (isPending) return skeleton;
  if (isError) return null;
  return <>{children(data.data)}</>;
};
