import Title from '@/components/Title'
import { ChevronDown, ChevronUp, GripVertical } from 'lucide-react'
import { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import type { Identifier, XYCoord } from 'dnd-core'
import { Switchh } from '@/components/Switch'
import { Button } from '@/components/ui/button'
import SectionSlugs from './SectionSlugs'
import { CampaignService } from '@/services/DI/Campaign'

type Props = {
    item: Section
    index: number
    id: string
    campaign_id: Campaign["id"]
    layout: Layout
    moveCard: (dragIndex: number, hoverIndex: number, section_id: string) => void
}

interface DragItem {
    index: number
    id: string
    section_id: string
    type: string
}

export const ItemTypes = {
    SECTION: 'SECTION'
}

const SectionLayout = ({ campaign_id, layout, item, id, index, moveCard }: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: ItemTypes.SECTION,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex, item.section_id)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.SECTION,
        item: () => {
            return { id, index, section_id: item.id }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    const handleLayoutIsActive = (layout: Layout) => {
        CampaignService.updateLayoutIsActive(layout)
    }

    const handleSlugRenderConditionChange = (slug: { [key: string]: boolean }) => {
    }

    return (
        <>
            <div ref={ref}
                className={`flex items-center gap-2 w-full`}
                draggable={!layout.is_active}
                style={{ opacity: opacity }}
                data-handler-id={handlerId}
            >
                {
                    layout.renderOn && (
                        <Button onClick={() => setIsOpen(!isOpen)} size={'sm'} variant={"outline"}>
                            {isOpen ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
                        </Button>
                    )
                }
                <div className={`flex justify-start items-center gap-2 p-2 border rounded-md bg-slate-50 flex-grow`}>
                    <GripVertical className={"w-4 h-4"} />
                    <Title size='xs' title={item.title} />
                </div>
                <Switchh text={layout.is_active ? "On" : "Off"} isActive={layout.is_active} onChange={() => handleLayoutIsActive(layout)} />

            </div>
            {isOpen && layout.renderOn && <SectionSlugs onChange={handleSlugRenderConditionChange} slugs={layout.renderOn} />}
        </>
    )
}

export default SectionLayout