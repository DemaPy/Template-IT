import { useForm, useWatch } from "react-hook-form";
import TemplateCardHeader from "./TemplateCardHeader";
import { TemplateCardFormValues, TemplateCardProps } from "./types";
import TemplateCardContent from "./TemplateCardContent";
import TemplateCardTitle from "./TemplateCardTitle";
import { Button } from "@/components/ui/button";
import { useTemplateUpdate } from "../../pages/hooks/useTemplate";
import { TEMPLATES_KEY } from "@/constance/query-key";

const TemplateCard = ({ item }: TemplateCardProps) => {
  const {
    control,
    setValue,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TemplateCardFormValues>({
    defaultValues: {
      title: item.title,
    },
  });
  const title = useWatch({
    control,
    name: "title", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
  });
  const { isPending, mutate } = useTemplateUpdate({
    invalidate_key: TEMPLATES_KEY,
  });

  const isChangedTitle = item.title !== title;

  const onSubmit = ({ title }: { title: Template["title"] }) => {
    mutate({ title: title, id: item.id });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="lg:p-4 p-2 flex flex-col gap-3 border rounded-md bg-blue-100 border-blue-300"
    >
      <TemplateCardHeader>
        <TemplateCardTitle item={item} register={register} errors={errors} />
      </TemplateCardHeader>
      <TemplateCardContent sections={item.sections} />
      {isChangedTitle && (
        <div className="flex gap-2">
          <Button
            disabled={isPending}
            className="w-full"
            variant={"ghost"}
            type="button"
            onClick={() => {
              setValue("title", item.title);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            className="w-full"
            variant={"outline"}
            type="submit"
          >
            Update
          </Button>
        </div>
      )}
    </form>
  );
};

export default TemplateCard;
