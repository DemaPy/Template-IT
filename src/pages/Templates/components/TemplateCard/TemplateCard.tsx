import { useForm } from "react-hook-form";
import TemplateCardHeader from "./TemplateCardHeader";
import { TemplateCardFormValues, TemplateCardProps } from "./types";
import TemplateCardContent from "./TemplateCardContent";

const TemplateCard = ({ item }: TemplateCardProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TemplateCardFormValues>({
    defaultValues: {
      title: item.title,
      sections: item.sections.map(item => item.content).join("")
    },
  });
  
  const onSubmit = () => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 flex flex-col gap-3 border rounded-md bg-blue-100 border-blue-300"
    >
      <TemplateCardHeader
        id={item.id}
        title={item.title}
        register={register}
        errors={errors}
      />
      <TemplateCardContent register={register} errors={errors} />
    </form>
  );
};

export default TemplateCard;
