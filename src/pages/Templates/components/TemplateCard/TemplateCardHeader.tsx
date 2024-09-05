import React, { PropsWithChildren } from "react";

const TemplateCardHeader = ({

  children
}: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-between gap-2">
      {
        React.Children.map(children, (child: React.ReactNode) => <>{child}</>)
      }
    </div>
  );
};

export default TemplateCardHeader;
