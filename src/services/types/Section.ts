export type UpdateSectionDTO = {
    id: Section["id"];
    title: Section["title"];
    content: Section["content"];
    placeholders: Placeholder[]
 }