import { create } from 'zustand'

type Store = {
    isOpen: boolean
    setOpen: () => void
    setPlaceholder: (component: Placeholder) => void
    setClose: () => void
    placeholder: Placeholder | null
}

export const usePlaceholderUpdateModal = create<Store>()((set) => ({
    isOpen: false,
    placeholder: null,
    setOpen: () => set(() => ({ isOpen: true })),
    setPlaceholder: (placeholder) => set(() => ({ placeholder })),
    setClose: () => set(() => ({ isOpen: false })),
}))