import { ReactElement, useEffect } from "react";
import toast from "react-hot-toast";
import { useFetchComponents } from "../pages/hooks/useComponent";

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
  if (isError) return null;
  return <>{children(data.data)}</>;
};
