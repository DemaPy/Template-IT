import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ensureError(value: unknown) {
  if (value instanceof Error) {
    return {
      data: null,
      error: value,
      message: value.message,
      status: "error",
    };
  }

  let stringified = "[Unable to stringify the thrown value]";
  try {
    stringified = JSON.stringify(value);
  } catch {}

  const error = new Error(
    `This value was thrown as is, not through an Error: ${stringified}`
  );
  return {
    data: null,
    error: error,
    message: error.message,
    status: "error",
  };
}
