import UpdateForm from "./UpdateForm";
import { useFetchComponent } from "../../pages/hooks/useComponent";
import ComponentUpdateSkeleton from "./ComponentSkeleton";
import { useEffect } from "react";
import toast from "react-hot-toast";

export function FetchComponentToUpdate({
  componet_id,
}: TFetchComponentToUpdate) {
  const { isPending, data, isError, error } = useFetchComponent(componet_id);

  useEffect(() => {
    if (isError) {
      toast.error((error as Error).message);
    }
  }, [isError, error]);

  if (isPending) return <ComponentUpdateSkeleton />;
  if (isError) return null;

  return <UpdateForm component={data.data} />;
}
