import { decode } from "html-entities";
import mustache from "mustache";

type Props = {
  sections: Section[] | Component[]
};

const fulfillWithFallbacks = ({ sections }: Props) => {
  let html = "";
  for (const section of sections) {
    const all_placehodlers = section.placeholders.reduce((acc, item) => {
      acc[item.title] = item.fallback;
      return acc;
    }, {} as Record<string, string>);
    try {
      const template = mustache.render(section.content, all_placehodlers);
      html += template.replace(/\n/g,'<br>')
    } catch (error) {
      console.warn(error)
    }
  }
  return {
    decoded: decode(html),
    raw: html,
  };
};

export default fulfillWithFallbacks;
