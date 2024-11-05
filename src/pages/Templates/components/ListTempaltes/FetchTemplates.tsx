import { ReactElement, useEffect } from "react";
import { useFetchTemplates } from "../../pages/hooks/useTemplate";
import toast from "react-hot-toast";
import { ErrorPage } from "@/pages/Error/Error";
import { AuthError } from "@/services/Errors/AuthError";
import { useNavigate } from "react-router-dom";

export const FetchTemplates = ({
  children,
  skeleton,
}: {
  skeleton: ReactElement;
  children: (data: Template[]) => ReactElement;
}) => {
  const navigate = useNavigate();
  const { data, isError, error, isPending } = useFetchTemplates();
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
  if (!data.data) return <ErrorPage path="/" message={"Something went wrong."} />;
  
  return <>{children(data.data)}</>;
};
