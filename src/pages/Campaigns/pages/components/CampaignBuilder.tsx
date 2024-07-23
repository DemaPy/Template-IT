import NavbarBuilder from "./NavbarBuilder"
import { decode } from "html-entities"
import { useState } from "react"

type Props = {
    sortedSections: Section[]
    campaign: Campaign
    slug: string
    layout: Layout[]
}

type Devices = { "desktop": string, "tablet": string, "mobile": string }
export type KeyDevices = keyof Devices

const CampaignBuilder = ({ layout, slug, sortedSections, campaign }: Props) => {
    const [device, setDevice] = useState<keyof Devices>("desktop")

    const devices: Devices = {
        "desktop": "1440px",
        "tablet": "920px",
        "mobile": "400px",
    }

    let html = ""
    for (const section of sortedSections) {
        const decode_html = section.content
        const doc = new DOMParser().parseFromString(decode_html, "text/html")
        const section_layout = layout.find(item => item.sectionId === section.id)!

        for (const placeholder of section.placeholders) {
            const node = doc.querySelector(`[data-template-it_id='${placeholder.id}']`)
            if (!node) continue

            let text = ""
            if (!(section.id in campaign.data)) {
                text += placeholder.fallback
            } else {
                // In case if selected slug has been disabled
                if (!section_layout.renderOn[slug]) {
                    continue
                }

                const campaign_data = campaign.data[section.id]
                // In case of section has different amounts of slugs
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
        <div className="w-full h-full overflow-hidden flex justify-center items-center flex-col gap-2 relative bg-slate-50 p-2">
            <NavbarBuilder setDevice={(device: KeyDevices) => setDevice(device)} html={decode(html)} campaign={campaign} />
            <iframe style={{ width: devices[device] }} srcDoc={decode(html)} className="h-full">
            </iframe>
        </div>
    )
}

export default CampaignBuilder
