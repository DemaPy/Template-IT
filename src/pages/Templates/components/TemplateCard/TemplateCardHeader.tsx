import TemplateCardActions from "./TemplateCardActions";
import TemplateCardTitle from "./TemplateCardTitle";
import { TemplateCardHeaderProps } from "./types";

const TemplateCardHeader = ({
  register,
  errors,
  title,
}: TemplateCardHeaderProps) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <TemplateCardTitle register={register} errors={errors} />
      <TemplateCardActions title={title} />
    </div>
  );
};

export default TemplateCardHeader;
