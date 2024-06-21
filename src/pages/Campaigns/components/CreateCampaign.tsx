import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useCampaignCreateModal } from '@/store/campaignCreateModal'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { TemplateService } from "@/services/DI/Template"
import { CampaignService } from "@/services/DI/Campaign"
import { useCampaignUpdateModal } from "@/store/campaignUpdateModal"


const CreateCampaign = () => {
    const [templates, setTemplates] = useState<Array<Template> | null>(null)
    const isOpen = useCampaignCreateModal(state => state.isOpen)
    const setClose = useCampaignCreateModal(state => state.setClose)
    const [campaignName, setCampaignName] = useState("")
    const [css, setCss] = useState("")
    const setCampaign = useCampaignUpdateModal(state => state.setCampaign)
    const [template_id, setTemplateId] = useState<string | null>(null)

    const onSubmit = async () => {
        if (campaignName.length >= 3 && template_id && css.length > 10) {
            const response = await CampaignService.create({ title: campaignName, templateId: template_id })
            if (response.status === "error") {

                if ("errors" in response) {
                    let error_message = ""
                    for (const error of response.errors) {
                        error_message += response.message + ": " + error.msg
                    }
                    alert(error_message)
                    return
                }
    
                alert(response.message)
                return
            }
            setCampaign(response.data!)
            setClose()
        } else {
            alert("Minimum length 3")
        }
    }

    useEffect(() => {
        (async () => {
            const response = await TemplateService.getAll()
            if (response.status === "error") {
                alert(response.message)
                return
            }
            setTemplates(response.data)
        })()
    }, [])

    if (!templates) return null

    return (
        <Dialog open={isOpen} onOpenChange={setClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create campaign</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Name
                        </Label>
                        <Input
                            id="name"
                            placeholder="campaign name"
                            value={campaignName}
                            onChange={ev => setCampaignName(ev.target.value)}
                            className="col-span-4"
                        />
                        <Label htmlFor="template_id" className="text-left">
                            Template
                        </Label>
                        <Select
                            value={template_id || ""}
                            onValueChange={value => setTemplateId(value)}
                        >
                            <SelectTrigger className="col-span-4">
                                <SelectValue placeholder="Select template" />
                            </SelectTrigger>
                            <SelectContent>
                                {templates.map((item, idx) => <SelectItem key={idx} value={item.id.toString()}>{item.title}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Label htmlFor="css" className="text-left">
                            Css
                        </Label>
                        <Textarea
                            id="css"
                            value={css}
                            onChange={ev => setCss(ev.target.value)}
                            className="col-span-4 resize-none w-full min-h-60"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCampaign