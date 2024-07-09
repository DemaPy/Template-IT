import NavbarBuilder from "./NavbarBuilder"
import { decode } from "html-entities"

type Props = {
    sortedSections: Section[]
    campaign: Campaign
    slug: string
    layout: Layout[]
}

const CampaignBuilder = ({ layout, slug, sortedSections, campaign }: Props) => {
    let html = ""
    for (const section of sortedSections) {
        const decode_html = section.content
        const doc = new DOMParser().parseFromString(decode_html, "text/html")
        
        for (const placeholder of section.placeholders) {
            const campaign_data = campaign.data[section.id]
            const data = campaign_data[placeholder.id][slug]
            const node = doc.querySelector(`[data-template-it_id='${placeholder.id}']`)
            if (!node) return
            node.insertAdjacentText("beforebegin", data)
            node.remove()
        }

        html += doc.body.innerHTML
    }

    if (!campaign.data) {
        return (
            <div className='w-full flex items-center justify-center flex-col text-md font-semibold text-center md:text-3xl'>Looks like you don't have data <br /> to render.</div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-2 relative bg-slate-50 p-2">
            <NavbarBuilder html={html} campaign={campaign} />
            <iframe srcDoc={decode(html)} className="h-full w-full">
            </iframe>
        </div>
    )
}

export default CampaignBuilder
