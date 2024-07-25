import { create } from 'zustand'

type Store = {
    isLogged: boolean
    setIsLoggedIn: () => void
    setIsLoggedOut: () => void
}

export const useAuth = create<Store>()((set) => ({
    isLogged: false,
    setIsLoggedIn: () => set(() => ({ isLogged: true })),
    setIsLoggedOut: () => set(() => ({ isLogged: false })),
}))