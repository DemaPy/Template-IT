import SectionLayout from "./SectionLayout"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useCallback } from "react"
type Props = {
    items: Section[] | null
    layouts: Layout[]
    campaign_id: Campaign["id"]
    handleSwap: (dragIndex: number, hoverIndex: number, section_id: string) => void
}

const CampaignLayout = ({
    items,
    layouts,
    campaign_id,
    handleSwap
}: Props) => {
    const moveCard = useCallback((dragIndex: number, hoverIndex: number, section_id: string) => {
        handleSwap(dragIndex, hoverIndex, section_id)
    }, [])

    const renderSection = useCallback(
        (section: Section, index: number) => {
            return (
                <SectionLayout
                    layout={layouts.find(item => item.section_id === section.id)!}
                    item={section}
                    key={section.id}
                    campaign_id={campaign_id}
                    index={index}
                    id={section.id}
                    moveCard={moveCard}
                />
            )
        },
        [],
    )
    if (!items) return null

    return (
        <DndProvider backend={HTML5Backend}>
            {items.map((section, i) => renderSection(section, i))}
        </DndProvider>
    )
}

export default CampaignLayout