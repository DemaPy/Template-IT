import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface TemplateCardProps {
  item: Template;
}

export interface TemplateCardFormValues
  extends Pick<Template, "title" | "sections"> {}
export interface TemplateCardTitleProps {
  errors: FieldErrors<TemplateCardFormValues>;
  register: UseFormRegister<TemplateCardFormValues>;
}
export interface TemplateCardHeaderProps {
  title: Template['title']
  errors: FieldErrors<TemplateCardFormValues>;
  register: UseFormRegister<TemplateCardFormValues>;
}
export interface TemplateCardActionsProps {
  title: Template['title']
}