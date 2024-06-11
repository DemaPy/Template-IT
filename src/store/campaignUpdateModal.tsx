import { create } from 'zustand'

type Store = {
    isOpen: boolean
    setOpen: () => void
    setCampaign: (campaign: Campaign) => void
    setClose: () => void
    campaign: Campaign | null
}

export const useCampaignUpdateModal = create<Store>()((set) => ({
    isOpen: false,
    campaign: null,
    setOpen: () => set(() => ({ isOpen: true })),
    setCampaign: (campaign) => set(() => ({ campaign })),
    setClose: () => set(() => ({ isOpen: false })),
}))