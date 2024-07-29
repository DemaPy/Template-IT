import { useCallback, useEffect, useMemo, useState } from 'react'
import Sidebar from './Sidebar'
import CampaignBuilder from './CampaignBuilder'
import update from 'immutability-helper'

const CampaignTemplateHandler = ({ campaign }: {
  campaign: Campaign
}) => {

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
    <div className="flex lg:flex-row flex-col gap-4 mt-6 flex-grow items-stretch">
      <Sidebar
        isLayoutChanged={isLayoutChanged}
        setIsLayoutChanged={setIsLayoutChanged}
        layout={layout}
        moveCard={moveCard}
        slug={slug}
        setSelectedSlug={setSelectedSlug}
        campaign={campaign}
        sortedSections={sortedSections}
        inActiveSections={sortedInactiveSections}
      />
      {slug ? (
        <div className='flex-grow-1 md:w-1/2 lg:h-3/4 w-full'>
          <CampaignBuilder layout={layout} slug={slug} campaign={campaign} sortedSections={sortedSections} />
        </div>
      ) : (
        <div className='w-full flex items-center justify-center flex-col text-md font-semibold text-center md:text-3xl text-slate-300'>Select slug to render campaign</div>
      )}
    </div>
  )
}

export default CampaignTemplateHandler

