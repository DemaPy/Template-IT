export type UpdateComponentDTO = {
    id: Component["id"];
    title: Component["title"];
    content: Component["content"];
    placeholders: Placeholder[]
 }