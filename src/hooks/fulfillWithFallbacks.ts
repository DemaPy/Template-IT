import { decode } from "html-entities";

type Props = {
  sections: Section[];
};

// 1. Parse template and change all placeholders with fallback data.
// 2. Return decoded nad raw html
const fulfillWithFallbacks = ({ sections }: Props) => {
  let html = "";
  for (const section of sections) {
    const decode_html = section.content;
    const doc = new DOMParser().parseFromString(decode_html, "text/html");

    for (const placeholder of section.placeholders) {
      const node = doc.querySelector(
        `[data-template-it_id='${placeholder.id}']`
      );
      if (!node) continue;
      node.insertAdjacentText("beforebegin", placeholder.fallback);
      node.remove();
    }

    html += doc.body.innerHTML;
  }
  return {
    decoded: decode(html),
    raw: html,
  };
};

export default fulfillWithFallbacks;
