import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCampaignUpdateModal } from '@/store/campaignUpdateModal'
import { useCampaignUpdate, useFetchCampaign } from "../pages/hooks/useCampaign"
import ComponentsSkeleton from "@/pages/Components/components/Skeleton"
import toast from "react-hot-toast"
import { useState } from "react"
import Error from "@/pages/Error/Error"

const UpdateCampaign = ({ campaign_id }: { campaign_id: Campaign['id'] }) => {

    const { isPending: isFetching, data, isError, error } = useFetchCampaign(campaign_id)
    const { isPending, mutate } = useCampaignUpdate({ invalidate_key: campaign_id })

    const isOpen = useCampaignUpdateModal(state => state.isOpen)
    const setClose = useCampaignUpdateModal(state => state.setClose)

    const [title, setTitle] = useState(data?.data.title || "")

    if (isFetching) return <ComponentsSkeleton />

    if (isError && !data) {
        toast.error(error.message);
        return <Error message={error.message} path="/campaigns" />
    }

    if (!data) {
        toast.error("Unexpected error happend.");
        return
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
                            value={title || data.data.title}
                            onChange={ev => setTitle(ev.target.value)}
                            className="col-span-4"
                        />
                    </div>
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