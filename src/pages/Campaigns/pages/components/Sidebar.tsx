import ListView from '@/components/List'
import Section from './Section'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CampaignLayout from './CampaignLayout'
import Title from '@/components/Title'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useLayoutOrderUpdate } from '../hooks/useLayout'

type Props = {
  isLayoutChanged: boolean
  setIsLayoutChanged: (val: boolean) => void
  slug: string | null
  setSelectedSlug: (slug: string) => void
  inActiveSections: Section[]
  sortedSections: Section[]
  campaign: Campaign
  layout: Layout[]
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

const Sidebar = ({ isLayoutChanged, setIsLayoutChanged, setSelectedSlug, layout, slug, campaign, sortedSections, inActiveSections, moveCard }: Props) => {
  const { isPending, mutate } = useLayoutOrderUpdate({ invalidate_key: campaign.id })

  const generateSlugs = () => {
    const _slugs = [""]
    for (const iterator of Object.values(campaign.data)) {
      const data = Object.values(iterator)
      data.forEach(item => {
        const keys = Object.keys(item)
        for (const slug of keys) {
          if (_slugs.includes(slug)) {
            continue
          } else {
            _slugs.push(slug)
          }
        }
      })

    }
    return _slugs.filter(Boolean)
  }


  return (
    <div className='w-1/2 overflow-auto max-h-[80vh]'>
      <Tabs defaultValue="sections">
        <TabsList className='sticky top-0 flex items-center justify-between bg-transparent z-50'>
          <div>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </div>
          {
            Object.keys(campaign.data).length > 0 && (
              <div>
                <Select
                  value={slug || ""}
                  onValueChange={value => setSelectedSlug(value.toUpperCase())}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select slug" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateSlugs().map((item, idx) => <SelectItem className='text-sm font-semibold' key={idx} value={item}>{item}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )
          }
        </TabsList>
        <TabsContent value="sections">
          <div className='flex flex-col gap-4'>
            <Title size='sm' title={"Connect data with placeholders"} />
            <ListView campaign={campaign} component={Section} items={sortedSections} />
          </div>
        </TabsContent>
        <TabsContent value="layout">
          <div className="flex flex-col gap-4">
            <div className='flex justify-between items-center'>
              <Title size='sm' title={"Swap layout sections"} />
              {isLayoutChanged && (
                <Button disabled={isPending} onClick={() => {
                  mutate(layout)
                  setIsLayoutChanged(false)
                }} variant={"secondary"} size={"sm"}>Save layout</Button>
              )}
            </div>
            <CampaignLayout isLayoutChanged={isLayoutChanged} moveCard={moveCard} layout={layout} sections={inActiveSections} />
          </div>
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default Sidebar