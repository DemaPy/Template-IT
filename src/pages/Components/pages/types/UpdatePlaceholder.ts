type TUpdatePlaceholder = {
  service: "section" | "component";
  placeholder_id: Placeholder["id"];
  invalidate_key: string
  title: string,
  fallback: string
};
