import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TemplateCardTitleProps } from "./types";
import Flex from "@/components/Layout/Flex";
import TemplateCardActions from "./TemplateCardActions";

const TemplateCardTitle = ({
  register,
  errors,
  item,
}: TemplateCardTitleProps) => {
  return (
    <div className="flex flex-col gap-1 flex-1">
      <div className="p-2">
        <Flex direction="row" justify="between" align="center" gap="4">
          <Label htmlFor="title">Title</Label>
          <TemplateCardActions id={item.id} title={item.title} />
        </Flex>
      </div>
      <Input
        {...register("title", {
          required: "Enter title",
          minLength: {
            value: 4,
            message: "Title too short.",
          },
          maxLength: {
            value: 30,
            message: "Title too long.",
          },
        })}
        id="title"
        type="text"
        placeholder="title"
        className="w-full"
      />
      {"title" in errors && (
        <p className="text-sm font-semibold text-red-300">
          {errors.title?.message || "Some error happend"}
        </p>
      )}
    </div>
  );
};

export default TemplateCardTitle;
