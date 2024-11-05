import { ReactElement } from "react";

export type FetchCcomponentProps = {
  children: (data: Component) => ReactElement;
  loadingSkeleton: ReactElement;
  errorSkeleton: ReactElement;
  component_id: Component["id"];
};
