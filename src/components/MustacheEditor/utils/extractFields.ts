import Mustache from "mustache";
import { ParsedTemplate } from "../types";

export const extractFields = ({
  template,
}: {
  template: string;
}): ParsedTemplate | Error => {
  try {
    const allTokens = Mustache.parse(template);
    const nameTokens = allTokens.filter((item) => item[0] === "name");
    const placeholders = nameTokens.map((item) => {
      return {
        title: item[1],
        fallback: "",
      };
    });
    return {
      template,
      tokens: nameTokens,
      placeholders: placeholders,
    };
  } catch (error) {
    if (error instanceof Error || error instanceof TypeError) {
      throw new Error(error.message);
    }
    throw new Error("Something went wrong");
  }
};
