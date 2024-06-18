import { useCallback, useEffect, useMemo, useState } from 'react'
import Sidebar from './Sidebar'
import CampaignBuilder from './CampaignBuilder'
import update from 'immutability-helper'
import { CampaignService } from '@/services/DI/Campaign'

type Props = {
  campaign: Campaign
  setCampaign: (c: Campaign) => void
}

const CampaignTemplateHandler = ({ campaign, setCampaign }: Props) => {
  const [isLayoutChanged, setIsLayoutChanged] = useState(false)
  const [layout, setLayout] = useState<Layout[]>(campaign.layout.toSorted((a, b) => a.order - b.order))
  const [slug, setSelectedSlug] = useState<string | null>(null)

  useEffect(() => {
    setLayout(campaign.layout.toSorted((a, b) => a.order - b.order))
  }, [campaign])

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setLayout((prev) => {
      const items = update(prev, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prev[dragIndex]],
        ],
      })
      return items.map((item, idx) => {
        return {
          ...item,
          order: idx
        }
      })
    })
    setIsLayoutChanged(true)
  }, [])

  const handleLayoutChange = async () => {
    setIsLayoutChanged(false)
    if (!layout) return
    const response = await CampaignService.updateLayoutsOrder(layout)
    if (response.status === "error") {
      alert(response.message)
      return
    }
    setCampaign(response.data)
  }

  const [sortedSections, sortedInactiveSections] = useMemo(() => {
    if (!layout) return [[], []]
    const sortedSections: Section[] = []
    const sortedInactiveSections: Section[] = []
    const map: Record<string, Section> = {}
    for (const section of campaign.template!.sections) {
      map[section.id] = section
    }
    for (const section_layout of layout) {
      if (section_layout.is_active) {
        sortedSections.push(map[section_layout.sectionId])
      }

      sortedInactiveSections.push(map[section_layout.sectionId])
    }
    return [sortedSections, sortedInactiveSections]
  }, [layout, campaign])

  return (
    <div className="flex gap-4 mt-6 flex-grow">
      <Sidebar isLayoutChanged={isLayoutChanged} handleLayoutChange={handleLayoutChange} layout={layout} moveCard={moveCard} slug={slug} setSelectedSlug={setSelectedSlug} campaign={campaign} sortedSections={sortedSections} inActiveSections={sortedInactiveSections} />
      <CampaignBuilder layout={layout} slug={slug} campaign={campaign} sortedSections={sortedSections} />
    </div>
  )
}

export default CampaignTemplateHandler

