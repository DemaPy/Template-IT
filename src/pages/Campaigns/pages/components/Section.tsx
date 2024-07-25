import Heading from '@/components/Heading'
import { Textarea } from '@/components/ui/textarea'
import { ChevronDown, ChevronUpIcon, ImportIcon } from 'lucide-react'
import { useState } from 'react'
import Placeholders from './Placeholders'
import SectionData from './SectionData'
import { CampaignService } from '@/services/DI/Campaign'
import { decode } from 'html-entities'
import ConnectDataWithPlaceholder from './ConnectDataWithPlaceholder'

export type DataToReturn = { id: string, title: string, data: Record<string, string> }[]

type Props = {
  item: Section
  campaign: Campaign
}

const Section = ({ campaign, item }: Props) => {
  const [isOpenData, setIsOpenData] = useState(false)

  const [isOpen, setIsOpen] = useState(false)
  const [isDataOpen, setIsDataOpen] = useState(false)

  const connectData = (data: Campaign['data']) => {
    if (!campaign.data[item.id]) return null
    const result = CampaignService.convertPlaceholders(data, item.placeholders, item.id)
    return result
  }
  
  return (
    <li className='w-full flex flex-col gap-4 border rounded-md p-2'>
      <Heading
        title={item.title}
        size='xs'
        actions={[
          { title: "Add data", onClick: () => setIsOpenData(true), icon: <ImportIcon className='w-4 h-4 mr-2' />, isLoading: item.placeholders.length === 0 },
          { icon: isDataOpen ? <ChevronUpIcon className='w-4 h-4 mr-2' /> : <ChevronDown className='w-4 h-4 mr-2' />, title: "Show data", onClick: () => setIsDataOpen(!isDataOpen) }
        ]}
        action={{ icon: isOpen ? <ChevronUpIcon className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />, onClick: () => setIsOpen(!isOpen) }} />
      {isOpen && (
        <>
          <Textarea disabled={true} defaultValue={decode(item.content)} className='resize-none w-full min-h-60 max-h-72' />
          <Placeholders placeholders={item.placeholders} />
        </>
      )}
      {
        isOpenData && (
          <ConnectDataWithPlaceholder isOpen={isOpenData} setClose={() => setIsOpenData(false)} section={item} campaignId={campaign.id} />
        )
      }
      {isDataOpen && <SectionData data={connectData(campaign.data)} />}
    </li>
  )
}

export default Section