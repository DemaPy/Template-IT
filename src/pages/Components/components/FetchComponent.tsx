import { useEffect } from "react";
import toast from "react-hot-toast";
import { FetchCcomponentProps } from "../types/FetchComponent";
import { useFetchComponent } from "../pages/hooks/useComponent";
import { useNavigate } from "react-router-dom";
import { AuthError } from "@/services/Errors/AuthError";
import { ErrorPage } from "@/pages/Error/Error";

export function FetchComponent({
  children,
  loadingSkeleton,
  component_id,
  errorSkeleton,
}: FetchCcomponentProps) {
  const navigate = useNavigate();
  const { isPending, isError, data, error } = useFetchComponent(component_id);
  useEffect(() => {
    if (isError) {
      toast.error((error as Error).message);
    }
    if (error instanceof AuthError) {
      navigate("/login");
      return;
    }
  }, [isError, error]);

  if (isPending) return loadingSkeleton;
  if (isError) return errorSkeleton;
  if (!data.data) return <ErrorPage path="/components" message={"Something went wrong."} />;

  return <>{children(data.data)}</>;
}
