import { decode } from "html-entities";
import mustache from "mustache";

type Props = {
  sections: Section[] | Component[]
};

const fulfillWithFallbacks = ({ sections }: Props) => {
  let raw_html = "";
  let html = ""
  for (const section of sections) {
    const all_placehodlers = section.placeholders.reduce((acc, item) => {
      acc[item.title] = item.fallback;
      return acc;
    }, {} as Record<string, string>);
    try {
      const template = mustache.render(section.content, all_placehodlers);
      raw_html += template.replace(/\n/g,'<br>')
      html += section.content.replace(/\n/g,'<br>')
    } catch (error) {
      console.warn(error)
    }
  }
  return {
    decoded: decode(raw_html),
    raw: raw_html,
    html
  };
};

export default fulfillWithFallbacks;
