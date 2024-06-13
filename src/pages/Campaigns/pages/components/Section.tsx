import Heading from '@/components/Heading'
import { Textarea } from '@/components/ui/textarea'
import { useAddDataToPlaceholderModal } from '@/store/addDataToPlaceholderModal'
import { ChevronDown, ChevronUpIcon } from 'lucide-react'
import { useState } from 'react'
import Placeholders from './Placeholders'
import SectionData from './SectionData'
import { CampaignService } from '@/services/DI/Campaign'
import { useCampaignUpdateModal } from '@/store/campaignUpdateModal'

export type DataToReturn = { id: string, title: string, data: Record<string, string> }[]

type Props = {
  item: Section
  campaign: Campaign
}

const Section = ({ campaign, item }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDataOpen, setIsDataOpen] = useState(false)
  const setOpen = useAddDataToPlaceholderModal(state => state.setOpen)
  const setPlaceholder = useAddDataToPlaceholderModal(state => state.setPlaceholder)
  const setCampaign = useCampaignUpdateModal(state => state.setCampaign)

  const handleClick = (placeholder: Placeholder) => {
    setCampaign(campaign)
    setPlaceholder(placeholder)
    setOpen()
  }

  const connectData = (data: Campaign['data']) => {
    const result = CampaignService.convertPlaceholders(data, item.placeholders, item.id)
    return result
  }

  return (
    <li className='w-full flex flex-col gap-4 border rounded-md p-2'>
      <Heading title={item.title} size='xs' actions={[{ isLoading: Object.keys(campaign.data).length === 0, icon: isDataOpen ? <ChevronUpIcon className='w-4 h-4 mr-2' /> : <ChevronDown className='w-4 h-4 mr-2' />, title: "Show data", onClick: () => setIsDataOpen(!isDataOpen) }]} action={{ icon: isOpen ? <ChevronUpIcon className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />, onClick: () => setIsOpen(!isOpen) }} />
      {isOpen && <Textarea disabled={true} defaultValue={item.content} className='resize-none w-full min-h-60 max-h-72' />}
      {isDataOpen && <SectionData data={connectData(campaign.data)} />}
      <Placeholders handleClick={handleClick} placeholders={item.placeholders} />
    </li>
  )
}

export default Section