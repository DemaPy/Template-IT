import { useEffect } from "react";
import toast from "react-hot-toast";
import { FetchCcomponentProps } from "../types/FetchComponent";
import { useFetchComponent } from "../pages/hooks/useComponent";

export function FetchComponent({
  children,
  loadingSkeleton,
  component_id,
  errorSkeleton,
}: FetchCcomponentProps) {
  const { isPending, isError, data, error } = useFetchComponent(component_id);
  useEffect(() => {
    if (isError) {
      toast.error((error as Error).message);
    }
  }, [isError, error]);

  if (isPending) return loadingSkeleton;
  if (isError) return errorSkeleton;

  return <>{children(data.data)}</>;
}
