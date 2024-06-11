import { create } from 'zustand'

type Store = {
    isOpen: boolean
    setOpen: () => void
    setComponent: (component: Component) => void
    setClose: () => void
    component: Component | null
}

export const useComponentUpdateModal = create<Store>()((set) => ({
    isOpen: false,
    component: null,
    setOpen: () => set(() => ({ isOpen: true })),
    setComponent: (component) => set(() => ({ component })),
    setClose: () => set(() => ({ isOpen: false })),
}))