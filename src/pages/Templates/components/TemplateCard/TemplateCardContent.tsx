import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TemplateCardContentProps } from "./types";

const TemplateCardContent = ({
  register,
  errors,
}: TemplateCardContentProps) => {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="content">Content</Label>
      <Textarea
        className="max-h-[620px] min-h-[280px]"
        {...register("sections", {
          required: "Enter sections",
          minLength: {
            value: 20,
            message: "Sections too short.",
          },
        })}
      />
      {"sections" in errors && (
        <p className="text-sm font-semibold text-red-300">
          {errors.sections?.message || "Some error happend"}
        </p>
      )}
    </div>
  );
};

export default TemplateCardContent;
