type TUpdateTemplate = {
    isOpen: boolean,
    setClose: () => void,
    template_id: Template['id']
}


type TFetchTemplateToUpdate = {
    template_id: Template['id']
    setTitle: (value: Template['title']) => void
    title: Template['title']
}