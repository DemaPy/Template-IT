import Mustache from "mustache";

export const extractFields = ({ template }: { template: string }) => {
  try {
    const nameMap: Record<string, number> = {};
    const repeated_placeholders: string[] = []
    let isAllUnique = true;
    const allTokens = Mustache.parse(template);
    const nameTokens = allTokens.filter((item) => item[0] === "name");
    const placeholders = nameTokens.map((item) => {
      if (nameMap[item[1]]) {
        isAllUnique = false;
        repeated_placeholders.push(item[1])
      }
      nameMap[item[1]] = 1
      return {
        title: item[1],
        fallback: "",
      };
    });
    return {
      placeholders,
      isAllUnique,
      repeated_placeholders
    };
  } catch (error) {
    return {
      placeholders: [],
      isAllUnique: true,
      repeated_placeholders: []
    }
  }
};
