import ListView from '@/components/List'
import Section from './Section'
import ConnectDataWithPlaceholder from './ConnectDataWithPlaceholder'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CampaignLayout from './CampaignLayout'
import Title from '@/components/Title'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Props = {
  slug: string | null
  setSelectedSlug: (slug: string) => void
  sections: Section[] | null
  inActiveSections: Section[] | null
  campaign: Campaign
  handleSwap: (dragIndex: number, hoverIndex: number, section_id: string) => void
}

const Sidebar = ({ setSelectedSlug, slug, campaign, sections, handleSwap, inActiveSections }: Props) => {


  return (
    <div className='w-3/4 overflow-auto max-h-[80vh]'>
      <Tabs defaultValue="sections">
        <TabsList className='sticky top-0 flex items-center justify-between bg-transparent bg-slate-50 z-50'>
          <div>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </div>
          <div>
            <Select
              value={slug || ""}
              onValueChange={value => setSelectedSlug(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select slug" />
              </SelectTrigger>
              <SelectContent>
                {["DE", "UK", "PL"].map((item, idx) => <SelectItem className='text-sm font-semibold' key={idx} value={item}>{item}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </TabsList>
        <TabsContent value="sections">
          <div className='flex flex-col gap-4'>
            <Title size='sm' title={"Connect data with placeholders"} />
            <ConnectDataWithPlaceholder />
            <ListView campaign={campaign} component={Section} items={sections} />
          </div>
        </TabsContent>
        <TabsContent value="layout">
          <div className="flex flex-col gap-4">
            <Title size='sm' title={"Swap layout sections"} />
            <CampaignLayout layouts={campaign.layout} handleSwap={handleSwap} items={inActiveSections} />
          </div>
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default Sidebar