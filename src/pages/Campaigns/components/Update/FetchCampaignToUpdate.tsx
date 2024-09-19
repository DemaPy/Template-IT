import {ErrorPage} from "@/pages/Error/Error"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useFetchCampaign } from "../../pages/hooks/useCampaign"
import ComponentsSkeleton from "@/pages/Components/components/ComponentsSkeleton"

export function FetchCampaignToUpdate({ campaign_id, setTitle }: TFetchCampaignToUpdate) {
    const { isPending: isFetching, data, isError, error } = useFetchCampaign(campaign_id)

    if (isFetching) return <ComponentsSkeleton />

    if (isError) {
        return <ErrorPage error={error} message={error.message} path="/campaigns" />
    }

    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
                Title
            </Label>
            <Input
                id="name"
                placeholder="campaign title"
                defaultValue={data.data.title}
                onChange={ev => setTitle(ev.target.value)}
                className="col-span-4"
            />
        </div>
    )
}