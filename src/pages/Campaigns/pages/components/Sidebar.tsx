import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLayoutOrderUpdate } from '../hooks/useLayout'
import SectionsTab from './SectionsTab'
import LayoutTab from "./LayoutTab"

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
    <div className='lg:w-3/4 w-full overflow-auto max-h-[80vh]'>
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
          <SectionsTab campaign={campaign} sortedSections={sortedSections} />
        </TabsContent>
        <TabsContent value="layout">
          <LayoutTab
            layout={layout}
            moveCard={moveCard}
            isPending={isPending}
            inActiveSections={inActiveSections}
            isLayoutChanged={isLayoutChanged}
            onLayoutSave={() => {
              mutate(layout)
              setIsLayoutChanged(false)
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Sidebar