import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { useCampaignUpdate } from "../../pages/hooks/useCampaign"
import { useState } from "react"
import Error from "@/pages/Error/Error"
import { FetchCampaignToUpdate } from "./FetchCampaignToUpdate"

const UpdateCampaign = ({ isOpen, setClose, campaign_id }: TUpdateCampaign) => {

    const { isPending, mutate, isError, error } = useCampaignUpdate({ invalidate_key: campaign_id })

    const [title, setTitle] = useState("")

    if (isError) {
        return <Error error={error} message={error.message} path="/campaigns" />
    }

    return (
        <Dialog open={isOpen} onOpenChange={setClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update campaign</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <FetchCampaignToUpdate campaign_id={campaign_id} setTitle={(value) => setTitle(value)} />
                </div>
                <DialogFooter>
                    <Button disabled={isPending} onClick={() => mutate({
                        title: title,
                        id: campaign_id,
                    })}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateCampaign