import Mustache from "mustache";

export const extractFields = ({ template }: { template: string }) => {
  try {
    const nameMap: Record<string, number> = {};
    let isAllUnique = true;
    const allTokens = Mustache.parse(template);
    const nameTokens = allTokens.filter((item) => item[0] === "name");
    const placeholders = nameTokens.map((item) => {
      if (nameMap[item[1]]) {
        isAllUnique = false;
      }
      nameMap[item[1]] = 1
      return {
        title: item[1],
        fallback: "",
      };
    });
    return {
      placeholders,
      isAllUnique
    };
  } catch (error) {
    return {
      placeholders: [],
      isAllUnique: true
    }
  }
};
