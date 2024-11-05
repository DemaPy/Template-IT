import { ReactElement, useEffect } from "react";
import { useFetchTemplates } from "../../pages/hooks/useTemplate";
import toast from "react-hot-toast";
import { ErrorPage } from "@/pages/Error/Error";

export const FetchTemplates = ({
  children,
  skeleton,
}: {
  skeleton: ReactElement;
  children: (data: Template[]) => ReactElement;
}) => {
  const { data, isError, error, isPending } = useFetchTemplates();
  useEffect(() => {
    if (isError) {
      toast.error((error as Error).message);
    }
  }, [isError, error]);

  if (isPending) return skeleton;
  if (isError) return <ErrorPage path="/" message={error?.message} />

  return <>{children(data.data)}</>;
};
