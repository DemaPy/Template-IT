import SectionLayout from "./SectionLayout"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useCallback } from "react"
type Props = {
    items: Section[] | null
    layouts: Layout[]
}

const CampaignLayout = ({
    items,
    layouts,
}: Props) => {
    
    const renderSection = useCallback(
        (section: Section, index: number) => {
            return (
                <SectionLayout
                    layouts={layouts}
                    item={section}
                    key={section.id}
                    index={index}
                    id={section.id}
                />
            )
        },
        [layouts],
    )
    if (!items) return null

    return (
        <DndProvider backend={HTML5Backend}>
            {items.map((section, i) => renderSection(section, i))}
        </DndProvider>
    )
}

export default CampaignLayout