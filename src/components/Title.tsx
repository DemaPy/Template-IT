import { ReactNode } from "react";

export type AvailableSizes = keyof Sizes

interface Sizes {
  "xxs": string,
  "xs": string,
  "sm": string,
  "md": string,
  "lg": string,
}

const Title = ({ title, size }: { title: string | ReactNode, size?: AvailableSizes }) => {
  if (!title) return null
  const sizes: Sizes = {
    xxs: "text-sm",
    xs: "text-md",
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
  };
  return (
    <h1 className={`${size ? sizes[size] : sizes["md"]} font-semibold`}>
      {title}
    </h1>
  );
};

export default Title;
