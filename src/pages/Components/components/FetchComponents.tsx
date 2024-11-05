import { ReactElement, useEffect } from "react";
import toast from "react-hot-toast";
import { useFetchComponents } from "../pages/hooks/useComponent";
import { ErrorPage } from "@/pages/Error/Error";

export const FetchComponents = ({
  children,
  skeleton,
}: {
  skeleton: ReactElement;
  children: (data: Component[]) => ReactElement;
}) => {
  const { data, isPending, isError, error } = useFetchComponents();
  useEffect(() => {
    if (isError) {
      toast.error((error as Error).message);
    }
  }, [isError, error]);

  if (isPending) return skeleton;
  if (isError) return <ErrorPage path="/components" message={error?.message}/>;

  return <>{children(data.data)}</>;
};
