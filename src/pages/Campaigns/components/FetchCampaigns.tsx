import { ReactElement, useEffect } from "react";
import toast from "react-hot-toast";
import { useFetchCampaigns } from "../pages/hooks/useCampaign";
import { ErrorPage } from "@/pages/Error/Error";

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
  if (isError)
    return <ErrorPage path="/" message={error?.message} />;
  return <>{children(data.data)}</>;
};
