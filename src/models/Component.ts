type Component = {
    id: string
    title: string
    content: string
    placeholders: Placeholder[]
}

type ComponentDeleteDTO = Component['id']