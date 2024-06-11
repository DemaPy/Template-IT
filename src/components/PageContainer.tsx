import { PropsWithChildren } from "react";

const PageContainer = ({ children }: PropsWithChildren) => {
  return <section className="mt-6 space-y-6 flex-grow flex flex-col">{children}</section>;
};

export default PageContainer;
