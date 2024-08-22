import Mustache from "mustache";
import { ParsedTemplate } from "../types";
import { v4 as uuidv4 } from "uuid";

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
        id: uuidv4(),
        title: item[1],
        fallback: "",
        type: "text" as PlaceholderTypes,
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
