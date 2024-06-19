import { ReactNode } from "react";

export type AvailableSizes = keyof Sizes
export type AvailableColors = keyof Colors

interface Sizes {
  "xxs": string,
  "xs": string,
  "sm": string,
  "md": string,
  "lg": string,
}

interface Colors {
  "neutral": string
  "default": string
}

const Title = ({ title, size, color }: { color?: AvailableColors, title: string | ReactNode, size?: AvailableSizes }) => {
  if (!title) return null
  const sizes: Sizes = {
    xxs: "text-sm",
    xs: "lg:text-md text-sm",
    sm: "lg:text-2xl md:text-md text-sm",
    md: "lg:text-4xl md:text-2xl text-md",
    lg: "lg:text-6xl md:text-4xl text-2xl",
  };
  const colors: Colors = {
    neutral: 'text-neutral-300',
    default: 'text-slate-700'
  };
  return (
    <h1 className={`${size ? sizes[size] : sizes["md"]} font-semibold leading-tight ${color ? colors[color] : colors["default"]}`}>
      {title}
    </h1>
  );
};

export default Title;
