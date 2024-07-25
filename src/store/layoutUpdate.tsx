import { create } from 'zustand'

type Store = {
    isOpen: boolean
    setOpen: () => void
    setLayout: (component: Layout) => void
    setClose: () => void
    layout: Layout | null
}

export const useLayoutUpdate = create<Store>()((set) => ({
    isOpen: false,
    layout: null,
    setOpen: () => set(() => ({ isOpen: true })),
    setLayout: (layout) => set(() => ({ layout })),
    setClose: () => set(() => ({ isOpen: false })),
}))