import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface TemplateCardProps {
  item: Template;
}

export interface TemplateCardFormValues {
  title: Template["title"];
}
export interface TemplateCardTitleProps {
  errors: FieldErrors<TemplateCardFormValues>;
  register: UseFormRegister<TemplateCardFormValues>;
}

export interface TemplateCardActionsProps {
  id: Template["id"];
  title: Template["title"];
}

export interface TemplateCardContentProps {
  sections: Section[];
}
