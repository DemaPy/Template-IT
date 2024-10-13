import { useEffect } from "react";
import toast from "react-hot-toast";
import { FetchTemplateProps } from "../types/UpdateTemplate";
import { useFetchTemplate } from "../hooks/useTemplate";

export function FetchTemplate({
  children,
  skeleton,
  template_id,
}: FetchTemplateProps) {
  const { isPending, isError, data, error } = useFetchTemplate(template_id);
  useEffect(() => {
    if (isError) {
      toast.error((error as Error).message);
    }
  }, [isError, error]);

  if (isPending) return skeleton;
  if (isError) return null;

  return <>{children(data.data)}</>;
}
