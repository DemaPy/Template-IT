import { useFetchTemplate } from "../../pages/hooks/useTemplate";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ComponentsSkeleton from "@/pages/Components/components/ComponentsSkeleton";
import { useEffect } from "react";
import toast from "react-hot-toast";

export function FetchTemplateToUpdate({
  template_id,
  setTitle,
}: TFetchTemplateToUpdate) {
  const {
    isPending: isFetching,
    data,
    isError,
    error,
  } = useFetchTemplate(template_id);

  useEffect(() => {
    if (isError) {
      toast.error((error as Error).message);
    }
  }, [isError, error]);

  if (isFetching) return <ComponentsSkeleton />;
  if (isError) return null;

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-left">
        Title
      </Label>
      <Input
        id="name"
        placeholder="template title"
        defaultValue={data.data.title}
        onChange={(ev) => setTitle(ev.target.value)}
        className="col-span-4"
      />
    </div>
  );
}
