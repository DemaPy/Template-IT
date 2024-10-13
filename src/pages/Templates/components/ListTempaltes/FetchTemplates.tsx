import { ReactElement } from "react";
import { useFetchTemplates } from "../../pages/hooks/useTemplate";
import { TemplatesSkeleton } from "../TemplateSkeleton";
import { ErrorPage } from "@/pages/Error/Error";

export const FetchTemplates = ({
  children,
}: {
  children: (data: ServerResponseSuccess<Template[]>) => ReactElement;
}) => {
  const { data, isError, error, isPending } = useFetchTemplates();

  if (isPending) return <TemplatesSkeleton />;

  if (isError) {
    return <ErrorPage error={error} message={error.message} path="/" />;
  }
  return <>{children(data)}</>;
};
