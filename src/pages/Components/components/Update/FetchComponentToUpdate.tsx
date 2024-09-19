import { ErrorPage } from "@/pages/Error/Error";
import UpdateForm from "./UpdateForm";
import { useFetchComponent } from "../../pages/hooks/useComponent";
import ComponentUpdateSkeleton from "./ComponentSkeleton";

export function FetchComponentToUpdate({
  componet_id,
  setClose,
}: TFetchComponentToUpdate) {
  const { isPending, data, isError, error } = useFetchComponent(componet_id);

  if (isPending) return <ComponentUpdateSkeleton />;

  if (isError) {
    return (
      <ErrorPage error={error} message={error.message} path="/templates" />
    );
  }

  return <UpdateForm setClose={setClose} component={data.data} />;
}
