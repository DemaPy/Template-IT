import { create } from 'zustand'

type Store = {
    isOpen: boolean
    setOpen: () => void
    setClose: () => void
}

export const useComponentCreateModal = create<Store>()((set) => ({
    isOpen: false,
    setOpen: () => set(() => ({ isOpen: true })),
    setClose: () => set(() => ({ isOpen: false })),
}))