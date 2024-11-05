import { useEffect } from "react";
import toast from "react-hot-toast";
import { FetchTemplateProps } from "../types/UpdateTemplate";
import { useFetchTemplate } from "../hooks/useTemplate";
import { ErrorPage } from "@/pages/Error/Error";
import { AuthError } from "@/services/Errors/AuthError";
import { useNavigate } from "react-router-dom";

export function FetchTemplate({
  children,
  skeleton,
  template_id,
}: FetchTemplateProps) {
  const navigate = useNavigate();
  const { isPending, isError, data, error } = useFetchTemplate(template_id);
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
  if (isError) return <ErrorPage path="/templates" message={error?.message} />;
  if (!data.data) return <ErrorPage path="/templates" message={"Something went wrong."} />;

  return <>{children(data.data)}</>;
}
