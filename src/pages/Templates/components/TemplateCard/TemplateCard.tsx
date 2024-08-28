import { useForm } from "react-hook-form";
import TemplateCardHeader from "./TemplateCardHeader";
import { TemplateCardFormValues, TemplateCardProps } from "./types";

const options = {
  defaultValues: {
    title: "",
    sections: [],
  },
};

const TemplateCard = ({ item }: TemplateCardProps) => {
  const {
    formState: { errors },
    setError,
    register,
    handleSubmit,
  } = useForm<TemplateCardFormValues>(options);

  return (
    <form className="p-4 border rounded-md bg-blue-100 border-blue-300">
      <TemplateCardHeader
        title={item.title}
        register={register}
        errors={errors}
      />
    </form>
  );
};

export default TemplateCard;
