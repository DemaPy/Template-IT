import { create } from 'zustand'

type Store = {
    isOpen: boolean
    setOpen: () => void
    setClose: () => void
    setPlaceholder: (placeholder: number) => void
    placeholder: number | null
}

export const usePlaceholderCreateModal = create<Store>()((set) => ({
    isOpen: false,
    placeholder: null,
    setOpen: () => set(() => ({ isOpen: true })),
    setPlaceholder: (placeholder) => set(() => ({ placeholder })),
    setClose: () => set(() => ({ isOpen: false })),
}))