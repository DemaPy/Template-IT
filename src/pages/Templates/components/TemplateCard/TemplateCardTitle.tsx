import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TemplateCardTitleProps } from "./types";

const TemplateCardTitle = ({ register, errors }: TemplateCardTitleProps) => {
  return (
    <div className="flex flex-col gap-1 flex-1">
      <Label htmlFor="title">Title</Label>
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
          }
        })}
        id="title"
        type="text"
        placeholder="title"
        className="max-w-96 w-full"
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
