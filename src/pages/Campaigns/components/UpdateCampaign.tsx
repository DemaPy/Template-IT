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

const UpdateCampaign = () => {
    const isOpen = useCampaignUpdateModal(state => state.isOpen)
    const setClose = useCampaignUpdateModal(state => state.setClose)
    const campaign = useCampaignUpdateModal(state => state.campaign)

    const [title, setTitle] = useState("")
    const [css, setCss] = useState("")

    useEffect(() => {
        if (campaign) {
            setTitle(campaign?.title)
            setCss(campaign?.css)
        }
    }, [campaign])

    const onSubmit = () => {
        if (campaign && title.length > 4 && css.length > 10) {
            CampaignService.update({ ...campaign, title: title, css: css })
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
                            className="col-span-4 resize-none w-full min-h-60"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateCampaign