import { useState } from 'react'
import Sidebar from './Sidebar'
import CampaignBuilder from './CampaignBuilder'

type Props = {
  campaign: Campaign
}

const CampaignTemplateHandler = ({ campaign }: Props) => {
  const [slug, setSelectedSlug] = useState<string | null>(null)

  const sortedSections: Section[] = []
  const sortedSectionsWithInactive: Section[] = []
  for (const section_layout of campaign.layout.toSorted((a, b) => a.order - b.order)) {
    for (let index = 0; index < campaign.template!.sections.length; index++) {
      const section = campaign.template!.sections[index];
      if (section_layout.sectionId === section.id && section_layout.is_active) {
        sortedSections.push(section)
      }
      if (section_layout.sectionId === section.id) {
        sortedSectionsWithInactive.push(section)
      }
    }
  }


  return (
    <div className="flex gap-4 mt-6 flex-grow">
      <Sidebar slug={slug} setSelectedSlug={setSelectedSlug} campaign={campaign} sections={sortedSections} inActiveSections={sortedSectionsWithInactive} />
      <CampaignBuilder layout={campaign.layout} slug={slug} campaign={campaign} sections={sortedSections} />
    </div>
  )
}

export default CampaignTemplateHandler

