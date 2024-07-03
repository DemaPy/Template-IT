import { decode } from 'html-entities';

type Props = {
    components: Component[]
}

const TemplateBuilder = ({ components }: Props) => {
    const component = components[0]
    let decoded = ""
    try {
        const dom = new DOMParser().parseFromString(decode(component.content), "text/html")
        const allSpans = dom.querySelectorAll("[data-template-it_id]")
        if (allSpans.length > 0) {
            allSpans.forEach(item => {
                const id = item.getAttribute("data-template-it_id")
                if (id) {
                    const content = component.placeholders.find(item => item.id === id)!
                    item.textContent = content?.fallback
                    return true
                }
                return false
            })
        }
        decoded = dom.body.innerHTML
    } catch (error) {
        console.log(error);
    }

    if (component.placeholders.length === 0) {
        return (
            <div className='w-full flex items-center justify-center flex-col text-md font-semibold text-center md:text-3xl'>Start adding placeholders</div>
        )
    }


    return (
        <div className="w-full flex flex-col gap-2 relative bg-slate-50 p-2">
            {/* <iframe srcDoc={`<style>${campaign.css || ""}</style> ${html}`} className="h-full w-full"> */}

            <div style={{
                height: '80vh',
                overflowY: "scroll"
            }}>
                <iframe srcDoc={decoded} className="h-full w-full">
                </iframe>
            </div>
        </div>
    )
}

export default TemplateBuilder
