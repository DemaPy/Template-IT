import { Button } from '@/components/ui/button'
import { usePreview } from '@/store/preview'
import { Copy, CopyCheck, Eye } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {
    campaign: Campaign
    html: string
}

const NavbarBuilder = ({ html, campaign }: Props) => {
    const [isCopy, setCopy] = useState(false)
    const isOpen = usePreview(store => store.isOpen)
    const setOpen = usePreview(store => store.setOpen)
    const setClose = usePreview(store => store.setClose)
    const handleCopy = () => {
        setCopy(true)
        navigator.clipboard.writeText(html)
        setClose()
        let id = setTimeout(() => {
            setCopy(false)
            clearTimeout(id)
        }, 600)
    }

    return (
        <div className='sticky flex gap-2 items-center top-0'>
            <Button onClick={() => setClose()} asChild size={"sm"} variant={"outline"}>
                <Link className='text-sm font-semibold' target='_blank' to={`/templates/${campaign.templateId}`}>Go to template</Link>
            </Button>
            <Button onClick={handleCopy} className='flex gap-2 items-center' size={"sm"} variant={"outline"}>
                {
                    isCopy
                    ?
                    <CopyCheck className='w-4 h-4' />
                    :
                    <Copy className='w-4 h-4' />
                }
                Copy
            </Button>
            <Button onClick={() => isOpen ? setClose() : setOpen(html)} className='flex gap-2 items-center' size={"sm"} variant={"outline"}>
                <Eye className='w-4 h-4' />
                Preview
            </Button>
        </div>
    )
}

export default NavbarBuilder