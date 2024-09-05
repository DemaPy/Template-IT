import fulfillWithFallbacks from "@/hooks/fulfillWithFallbacks"

type Props = {
    sections: Section[]
}

const TemplateBuilder = ({ sections }: Props) => {
    const {
        decoded,
    } = fulfillWithFallbacks({ sections })

    if (!sections) {
        return (
            <div className='w-full flex items-center justify-center flex-col text-md font-semibold text-center md:text-3xl'>Start adding sections</div>
        )
    }

    return (
        <div className="w-full min-h-96 flex flex-col gap-2 relative bg-slate-50 p-2 grow">
            <iframe srcDoc={decoded} className="h-full w-full grow">
            </iframe>
        </div>
    )
}

export default TemplateBuilder
