type Placeholder = {
  id: string;
  title: string;
  fallback: string;
  type: PlaceholderTypes;
};

type PlaceholderTypes = "text" | "url";
