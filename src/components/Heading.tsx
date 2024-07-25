import { ReactNode } from "react";
import Title, { AvailableSizes } from "./Title";
import { Button } from "./ui/button";

type Heading = {
  size?: AvailableSizes;
  title: string | ReactNode
  subtitle?: string | ReactNode
  actions?: {
    title?: string,
    icon: ReactNode,
    onClick: () => void,
    isLoading?: boolean
  }[]
  action?: {
    title?: string,
    icon: ReactNode,
    onClick: () => void,
    isLoading?: boolean
  }
}

const Heading = ({ title, subtitle, size, action, actions }: Heading) => {
  return (
    <header className="flex justify-between items-center">
      <Title title={title} size={size} />
      <Title title={subtitle} size="xs" />
      <div className="flex items-center gap-2">
        {actions ?
          actions?.map((action, idx) => (
            <Button
              disabled={action.isLoading}
              key={idx}
              size={"sm"}
              onClick={action.onClick}
            >
              {action.icon}
              <span className="md:block hidden text-sm">{action.title || ""}</span>
            </Button>
          ))
          : ""}
        {
          action && (
            <Button
              disabled={action.isLoading}
              size={"sm"}
              onClick={action.onClick}
            >
              {action.icon}
              <span className="md:block hidden text-sm">{action.title || ""}</span>
            </Button>
          )
        }
      </div>
    </header>
  );
};

export default Heading;
