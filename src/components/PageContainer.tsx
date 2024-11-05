import { PropsWithChildren } from "react";

const PageContainer = ({ children }: PropsWithChildren) => {
  return <section className="grow flex items-stretch flex-col gap-2 md:space-y-4 h-full">{children}</section>;
};

export default PageContainer;
