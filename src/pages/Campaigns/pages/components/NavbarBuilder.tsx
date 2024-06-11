import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { Link } from 'react-router-dom'

type Props = {
    campaign: Campaign
    html: string
}

const NavbarBuilder = ({ html, campaign }: Props) => {

    const handleCopy = () => {
        navigator.clipboard.writeText(html)
    }
    return (
        <div className='sticky flex gap-2 items-center top-0'>
            <Button asChild size={"sm"} variant={"outline"}>
                <Link className='text-sm font-semibold' to={`/templates/${campaign.template_id}`}>Go to template</Link>
            </Button>
            <Button onClick={handleCopy} className='flex gap-2 items-center' size={"sm"} variant={"outline"}>
                <Copy className='w-4 h-4' />
                Copy
            </Button>
        </div>
    )
}

export default NavbarBuilder