import Mustache from "mustache";

export const extractFields = ({ template }: { template: string }) => {
  try {
    const allTokens = Mustache.parse(template);
    const nameTokens = allTokens.filter((item) => item[0] === "name");
    const placeholders = nameTokens.map((item) => {
      return {
        title: item[1],
        fallback: "",
      };
    });
    return placeholders;
  } catch (error) {
    return [];
  }
};
