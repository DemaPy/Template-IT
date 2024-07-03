type Component = {
    id: string
    title: string
    content: string
    placeholders: Placeholder[]
}

type ComponentCreateDTO = {
    title: Component['title']
    content: Component['content']
    placeholders?: Pick<Placeholder, "title" | 'position' | 'fallback'>[]
}

type ComponentDeleteDTO = Component['id']