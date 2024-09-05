import { PropsWithChildren } from "react";

const PageContainer = ({ children }: PropsWithChildren) => {
  return <section className="grow flex items-stretch flex-col space-y-6">{children}</section>;
};

export default PageContainer;
