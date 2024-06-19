import Title from "@/components/Title"
import { useEffect, useState } from "react"


const Instruction = () => {


    return (
        <>
            <Step1 />
            <Step2 />
        </>
    )
}


const Step1 = () => {
    const [templates, setTemplates] = useState([])
    useEffect(() => {

    }, [])
    return (
        <section className="h-screen">
            <Title color="neutral" size="xs" title="Step 1" />
            <Title title="Create or select template" />
            <div className="flex md:flex-row flex-col md:h-1/2 h-full">
                <div className="w-full h-full"></div>
                <div className="w-full h-full bg-slate-50 rounded-md"></div>
            </div>
        </section>
    )
}

const Step2 = () => {
    const [components, setComponents] = useState([])
    useEffect(() => {

    }, [])
    return (
        <section className="h-screen">
            <Title color="neutral" size="xs" title="Step 2" />
            <Title title="Create component" />
            <div className="flex md:flex-row flex-col md:h-1/2 h-full">
                <div className="w-full h-full"></div>
                <div className="w-full h-full bg-slate-50 rounded-md"></div>
            </div>
        </section>
    )
}

export default Instruction