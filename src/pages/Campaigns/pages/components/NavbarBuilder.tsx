import { Button } from '@/components/ui/button'
import { usePreview } from '@/store/preview'
import { Copy, CopyCheck, Eye, MonitorStop, Tablet, TabletSmartphone } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { KeyDevices } from './PreviewPage'

type Props = {
    campaign: Campaign
    html: string
    setDevice: (device: KeyDevices) => void
}

const NavbarBuilder = ({ html, campaign, setDevice }: Props) => {
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
        <div className='sticky flex gap-2 items-center left-0 top-0'>
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
            <Button onClick={() => setDevice("desktop")} className='flex gap-2 items-center' size={"sm"} variant={"outline"}>
                <MonitorStop className='w-4 h-4' />
            </Button>
            <Button onClick={() => setDevice("tablet")} className='flex gap-2 items-center' size={"sm"} variant={"outline"}>
                <Tablet className='w-4 h-4' />
            </Button>
            <Button onClick={() => setDevice("mobile")} className='flex gap-2 items-center' size={"sm"} variant={"outline"}>
                <TabletSmartphone className='w-4 h-4' />
            </Button>
        </div>
    )
}

export default NavbarBuilder