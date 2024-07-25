import { create } from 'zustand'

type Store = {
    isOpen: boolean
    setOpen: () => void
    setSection: (section: Section) => void
    setClose: () => void
    section: Section | null
}

export const useSectionUpdateModal = create<Store>()((set) => ({
    isOpen: false,
    section: null,
    setOpen: () => set(() => ({ isOpen: true })),
    setSection: (section) => set(() => ({ section })),
    setClose: () => set(() => ({ isOpen: false })),
}))