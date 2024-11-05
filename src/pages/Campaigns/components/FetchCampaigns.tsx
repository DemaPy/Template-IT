import { ReactElement, useEffect } from "react";
import toast from "react-hot-toast";
import { useFetchCampaigns } from "../pages/hooks/useCampaign";
import { ErrorPage } from "@/pages/Error/Error";
import { useNavigate } from "react-router-dom";
import { AuthError } from "@/services/Errors/AuthError";

export const FetchCampaigns = ({
  children,
  skeleton,
}: {
  skeleton: ReactElement;
  children: (data: Campaign[]) => ReactElement;
}) => {
  const navigate = useNavigate();
  const { data, isPending, isError, error } = useFetchCampaigns();
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
  if (isError) return <ErrorPage path="/" message={error?.message} />;
  if (!data.data)
    return <ErrorPage path="/" message={"Something went wrong."} />;

  return <>{children(data.data)}</>;
};
