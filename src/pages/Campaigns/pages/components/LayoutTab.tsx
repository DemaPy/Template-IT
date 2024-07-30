import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import CampaignLayout from './CampaignLayout'

type Props = {
    isPending: boolean
    isLayoutChanged: boolean
    inActiveSections: Section[]
    onLayoutSave: () => void
    moveCard: (dragIndex: number, hoverIndex: number) => void
    layout: Layout[]
}

const LayoutTab = ({ isPending, isLayoutChanged, onLayoutSave, inActiveSections, moveCard, layout }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <div className='flex justify-between items-center'>
                <Title size='sm' title={"Swap layout sections"} />
                {isLayoutChanged && (
                    <Button disabled={isPending} onClick={onLayoutSave} variant={"secondary"} size={"sm"}>Save layout</Button>
                )}
            </div>
            <CampaignLayout isLayoutChanged={isLayoutChanged} moveCard={moveCard} layout={layout} sections={inActiveSections} />
        </div>
    )
}

export default LayoutTab