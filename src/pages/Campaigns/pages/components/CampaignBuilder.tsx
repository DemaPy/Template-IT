import NavbarBuilder from "./NavbarBuilder"

type Props = {
    sortedSections: Section[] | null
    campaign: Campaign
    slug: string | null
    layout: Layout[]
}

const CampaignBuilder = ({ layout, slug, sortedSections, campaign }: Props) => {

    let html = ''

    if (!campaign.data) {
        return (
            <div className='w-full flex items-center justify-center flex-col text-md font-semibold text-center md:text-3xl'>Looks like you don't have data <br /> to render.</div>
        )
    }

    if (!slug) {
        return (
            <div className='w-full flex items-center justify-center flex-col text-md font-semibold text-center md:text-3xl text-slate-300'>Select slug to render campaign</div>
        )
    }

    if (campaign.data && sortedSections && slug) {
        for (const section of sortedSections) {

            const sectionLayout = layout.find(item => item.sectionId === section.id)

            // Check if current section can be rendered
            if (!sectionLayout?.renderOn![slug]) {
                continue
            }

            // for paddings
            if (!(section.id in campaign.data)) {
                html += section.content
                continue
            }
            
            let shift = 0
            const sectionPlaceholdersSort = section.placeholders?.toSorted((a, b) => a.position - b.position)

            const document = section.content.split("")
            const content = campaign.data[section.id] as { [key: string]: { [key: string]: string } }
            if (!content) continue
            const keys = Object.keys(content)
            if (!keys.length) continue
            // If data appears, placeholders also.
            for (const placeholder of sectionPlaceholdersSort!) {
                if (!(placeholder.id in content) || !(slug in content[placeholder.id])) {
                    document.splice(placeholder.position + shift, 0, placeholder.fallback)
                    shift++
                    continue
                }
                document.splice(placeholder.position + shift, 0, content[placeholder.id][slug])
                shift++
            }

            html += document.join("")
        }
    }

    return (
        <div className="w-full flex flex-col gap-2 relative bg-slate-50 p-2">
            <NavbarBuilder html={html} campaign={campaign} />

                <iframe srcDoc={`<style>${campaign.css || ""}</style> ${html}`} className="h-full w-full">
                </iframe>
            {/* <div className='flex items-center justify-start flex-col' dangerouslySetInnerHTML={{ __html: campaign.css || "" }}></div>
                <div className='flex items-center justify-start flex-col' dangerouslySetInnerHTML={{ __html: html }}></div> */}
        </div>
    )
}

export default CampaignBuilder
