export function createPlaceholderNode({
  title,
  id,
  clickEventHandler,
}: PlaceholderNodeProps) {
  const span = document.createElement("span");
  span.textContent = title;
  span.style.cssText =
    "cursor: pointer; padding: 0.2rem 0.4rem; border-radius: 0.2rem; background: #095cec63; font-size: 14px; box-shadow: 0px 0px 5px #00000060";
  span.setAttribute("data-template-it_id", id);
  span.addEventListener("click", (ev) => {
    clickEventHandler(ev);
  });
  return span;
}

export function isUserChangedSomethingInPlaceholders({
  html,
  placehodlers,
}: IsPlaceholdersChanged) {
  const _placehodlersToDelete: Placeholder[] = [];
  const dom = new DOMParser().parseFromString(html, "text/html");
  for (const placeholder of placehodlers) {
    const dom_placeholder = dom.body.querySelector(
      `[data-template-it_id='${placeholder.id}']`
    );
    if (!dom_placeholder) {
      _placehodlersToDelete.push(placeholder);
    }
  }
  return {
    html: html.trim(),
    _placehodlersToDelete,
  };
}
