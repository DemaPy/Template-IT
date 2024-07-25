import { Button } from "@/components/ui/button"
import { Copy, CopyCheck } from "lucide-react"
import { useState } from "react"

type Props = {
    item: Placeholder
}

const Placeholder = ({ item }: Props) => {
    const [isCopied, setIsCopied] = useState(false)

    const handleCopyTitle = () => {
        setIsCopied(true)
        navigator.clipboard.writeText(item.title)
        setTimeout(() => {
            setIsCopied(false)
        }, 1000)
    }
    return (
        <div className='flex w-full justify-between gap-2 items-center' key={item.id}>
            <p className="p-2 border rounded-md grow text-sm" >{item.title}</p>
            <Button className={`${isCopied ? "bg-green-50" : ""} transition-all`} onClick={handleCopyTitle} variant={"outline"} size={"sm"}>{isCopied ? <CopyCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}</Button>
        </div>
    )
}

export default Placeholder