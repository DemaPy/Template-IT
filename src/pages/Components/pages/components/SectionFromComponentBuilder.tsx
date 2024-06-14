
type Props = {
    components: Component[]
}

const SectionFromComponentBuilder = ({ components }: Props) => {

    let html = ''

    for (const component of components) {
        let shift = 0
        const sectionPlaceholdersSort = component.placeholders?.toSorted((a, b) => a.position - b.position)
        const document = component.content.split("")
        // If data appears, placeholders also.
        for (const placeholder of sectionPlaceholdersSort!) {
            document.splice(placeholder.position + shift, 0, placeholder.fallback)
            shift++
        }

        html += document.join("")
    }


    if (!components) {
        return (
            <div className='w-full flex items-center justify-center flex-col text-md font-semibold text-center md:text-3xl'>Start adding sections</div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-2 relative bg-slate-50 p-2">
            {/* <iframe srcDoc={`<style>${campaign.css || ""}</style> ${html}`} className="h-full w-full"> */}

            <div style={{
                height: '30vh',
                overflowY: "scroll"
            }}>
                <iframe style={{height: '100vh'}} srcDoc={`${html}`} className="h-full w-full pointer-events-none">
                </iframe>
            </div>
        </div>
    )
}

export default SectionFromComponentBuilder
