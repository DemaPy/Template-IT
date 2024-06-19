import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useCampaignUpdateModal } from '@/store/campaignUpdateModal'
import { CampaignService } from "@/services/DI/Campaign"
import { handleResponse } from "@/utils/handleResponse"
import { useLocation, useNavigate } from "react-router-dom"

const UpdateCampaign = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const isOpen = useCampaignUpdateModal(state => state.isOpen)
    const setClose = useCampaignUpdateModal(state => state.setClose)
    const campaign = useCampaignUpdateModal(state => state.campaign)
    const setCampaign = useCampaignUpdateModal(state => state.setCampaign)

    const [title, setTitle] = useState("")
    const [css, setCss] = useState("")

    useEffect(() => {
        if (campaign) {
            setTitle(campaign?.title)
            setCss(campaign?.css)
        }
    }, [campaign])

    const onSubmit = async () => {
        if (campaign && title.length > 4 && css.length > 10) {
            setLoading(true)
            const response = await CampaignService.update({ ...campaign, title: title, css: css })
            const parsed = handleResponse<Campaign>(response, location, navigate)
            setLoading(false)
            if (parsed) {
                setCampaign(parsed.data!)
            }
            setClose()
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update campaign</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Name
                        </Label>
                        <Input
                            id="name"
                            placeholder="campaign name"
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                            className="col-span-4"
                        />
                        <Label htmlFor="css" className="text-left">
                            Css
                        </Label>
                        <Textarea
                            id="css"
                            value={css}
                            onChange={ev => setCss(ev.target.value)}
                            className="col-span-4 resize-none w-full min-h-96"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button disabled={loading} onClick={onSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateCampaign