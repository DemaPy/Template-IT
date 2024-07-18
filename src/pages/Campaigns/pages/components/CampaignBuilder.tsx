import NavbarBuilder from "./NavbarBuilder"
import { decode } from "html-entities"

type Props = {
    sortedSections: Section[]
    campaign: Campaign
    slug: string
    layout: Layout[]
}

//@ts-ignore
const CampaignBuilder = ({ layout, slug, sortedSections, campaign }: Props) => {
    let html = ""
    for (const section of sortedSections) {
        const decode_html = section.content
        const doc = new DOMParser().parseFromString(decode_html, "text/html")
        
        for (const placeholder of section.placeholders) {
            const node = doc.querySelector(`[data-template-it_id='${placeholder.id}']`)
            if (!node) continue

            let text = ""
            if (!(section.id in campaign.data)) {
                text += placeholder.fallback
            } else {
                const campaign_data = campaign.data[section.id]
                // In case of sections has different amounts of slugs
                if (!(slug in campaign_data[placeholder.id])) {
                    text = placeholder.fallback
                }
                text = campaign_data[placeholder.id][slug]
            }
            node.insertAdjacentText("beforebegin", text)
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
            <NavbarBuilder html={decode(html)} campaign={campaign} />
            <iframe srcDoc={decode(html)} className="h-full w-full">
            </iframe>
        </div>
    )
}

export default CampaignBuilder
