import { useState } from 'react'
import NavbarBuilder from './NavbarBuilder'

type Props = {
    html: string
    campaign: Campaign
}
type Devices = { "desktop": string, "tablet": string, "mobile": string }
export type KeyDevices = keyof Devices
const PreviewPage = ({ html, campaign }: Props) => {
    const [device, setDevice] = useState<keyof Devices>("desktop")

    const devices: Devices = {
        "desktop": "1440px",
        "tablet": "920px",
        "mobile": "400px",
    }

    return (
        <div className="fixed inset-0 bg-slate-50 z-50 rounded-md">
            <div className="p-4 border-b-2">
                <NavbarBuilder setDevice={(device: KeyDevices) => setDevice(device)} html={html} campaign={campaign} />
            </div>
            <div className='flex justify-center h-full'>
            <iframe srcDoc={html} style={{ width: devices[device] }} className="fixed h-full overflow-y-auto pb-20">
            </iframe>
            </div>
        </div>
    )
}

export default PreviewPage