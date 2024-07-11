import { create } from 'zustand'

type Store = {
    isOpen: boolean
    setOpen: (html: string) => void
    setClose: () => void
    html: string
}

export const usePreview = create<Store>()((set) => ({
    isOpen: false,
    setOpen: (html) => set(() => ({html: html, isOpen: true })),
    setClose: () => set(() => ({ isOpen: false })),
    html: ''
}))