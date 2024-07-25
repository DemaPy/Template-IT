import { create } from 'zustand'

type Store = {
    isOpen: boolean
    setOpen: () => void
    setClose: () => void
    setPlaceholder: (placeholder: Placeholder) => void
    placeholder: Placeholder | null
}

export const useAddDataToPlaceholderModal = create<Store>()((set) => ({
    isOpen: false,
    placeholder: null,
    setOpen: () => set(() => ({ isOpen: true })),
    setPlaceholder: (placeholder) => set(() => ({ placeholder })),
    setClose: () => set(() => ({ isOpen: false })),
}))