import { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="container max-w-screen-xl mx-auto md:px-4 px-2 pt-16 md:pt-24 min-h-screen flex flex-col items-stretch h-full">
      {children}
    </div>
  );
};
