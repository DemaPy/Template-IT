type TUpdateTemplate = {
    template_id: Template['id']
}


type TFetchTemplateToUpdate = {
    template_id: Template['id']
    setTitle: (value: Template['title']) => void
}