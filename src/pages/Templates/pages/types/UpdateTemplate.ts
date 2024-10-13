import { ReactElement } from "react";

export type FetchTemplateProps = {
  children: (data: Template) => ReactElement;
  skeleton: ReactElement;
  template_id: Template["id"];
};
