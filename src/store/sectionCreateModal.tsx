import { create } from 'zustand'

type Store = {
    isOpen: boolean
    setOpen: () => void
    setClose: () => void
    section: Section | null
    setSection: (section: Section) => void
}

export const useSectionCreateModal = create<Store>()((set) => ({
    isOpen: false,
    section: null,
    setOpen: () => set(() => ({ isOpen: true })),
    setClose: () => set(() => ({ isOpen: false })),
    setSection: (section) => set(() => ({ section }))
}))