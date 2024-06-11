import { useState } from 'react'
import Sidebar from './Sidebar'
import CampaignBuilder from './CampaignBuilder'
import update from 'immutability-helper'
import { CampaignService } from '@/services/DI/Campaign'

type Props = {
  campaign: Campaign
}

const CampaignTemplateHandler = ({ campaign }: Props) => {
  const [slug, setSelectedSlug] = useState<string | null>(null)
  const [_sections, setSections] = useState<Section[]>(campaign.template.sections)
  const [layout, setLayout] = useState<Layout[]>(campaign.layout.toSorted((a, b) => a.order - b.order))

  const sortedSections: Section[] = []
  const sortedSectionsWithInactive: Section[] = []
  for (const section_layout of layout) {
    for (let index = 0; index < _sections.length; index++) {
      const section = _sections[index];
      if (section_layout.section_id === section.id && section_layout.is_active) {
        sortedSections.push(section)
      }
      if (section_layout.section_id === section.id) {
        sortedSectionsWithInactive.push(section)
      }
    }
  }

  const handleSwap = (dragIndex: number, hoverIndex: number, section_id: string) => {
    const newLayout = layout.map(item => {
      if (item.order === dragIndex) {
        return {
          ...item,
          order: hoverIndex
        }
      }

      if (item.order === hoverIndex) {
        return {
          ...item,
          order: dragIndex
        }
      }
      return item
    })
    setSections((prevCards: Section[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Section],
        ],
      }),
    )
    setLayout(newLayout.toSorted((a, b) => a.order - b.order))
    CampaignService.saveLayout(newLayout)
  }

  return (
    <div className="flex gap-4 mt-6 flex-grow">
      <Sidebar slug={slug} setSelectedSlug={setSelectedSlug} handleSwap={handleSwap} campaign={campaign} sections={sortedSections} inActiveSections={sortedSectionsWithInactive} />
      <CampaignBuilder layout={layout} slug={slug} campaign={campaign} sections={sortedSections} />
    </div>
  )
}

export default CampaignTemplateHandler

