import { PropsWithChildren, ReactNode } from "react";

export interface DialogProps extends PropsWithChildren {
  onSubmit: () => void;
  onCancel: () => void;
  title: string;
  description?: ReactNode;
}
