import { create } from 'zustand'

type Store = {
    isOpen: boolean
    setOpen: () => void
    setTemplate: (template: Template) => void
    setClose: () => void
    template: Template | null
}

export const useTemplateUpdateModal = create<Store>()((set) => ({
    isOpen: false,
    template: null,
    setOpen: () => set(() => ({ isOpen: true })),
    setTemplate: (template) => set(() => ({ template })),
    setClose: () => set(() => ({ isOpen: false })),
}))