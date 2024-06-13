import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useAddDataToPlaceholderModal } from "@/store/addDataToPlaceholderModal"
import CSVReader, { IFileInfo } from "react-csv-reader"
import SelectCSV from "./SelectCSV"
import Title from "@/components/Title"
import { CampaignService } from "@/services/DI/Campaign"
import { useCampaignUpdateModal } from "@/store/campaignUpdateModal"


const ConnectDataWithPlaceholder = () => {
  const [parsedCSV, setParsedCSV] = useState<any[] | null>(null)
  const [columns, setColumns] = useState<any[] | null>(null)
  const [column, setColumn] = useState<string | null>(null)
  const isOpen = useAddDataToPlaceholderModal(state => state.isOpen)
  const setClose = useAddDataToPlaceholderModal(state => state.setClose)
  const placeholder = useAddDataToPlaceholderModal(state => state.placeholder)
  const campaign = useCampaignUpdateModal(state => state.campaign)
  const setCampaign = useCampaignUpdateModal(state => state.setCampaign)

  const onSubmit = async () => {
    if (placeholder && campaign && parsedCSV && column) {
      const data: Record<string, string> = {}
      for (const slug_data of parsedCSV) {
        data[slug_data.slug] = slug_data[column.toLowerCase()]
      }
      let newConnection: Record<string, Record<string, Record<string, string>>> = {}
      newConnection[placeholder.sectionId!] = {
        [placeholder.id]: data
      }
      const response = await CampaignService.savePlaceholderData({ campaignId: campaign.id, data: newConnection })
      if (response.status === "error") {
        alert(response.message)
      }
      if (response.status === "success") {
        setCampaign(response.data)
      }
      setClose()
    }

  }

  const handle_CSV = (data: any[], fileInfo: IFileInfo, originalFile: File | undefined) => {
    const [keys, ...content] = data
    const CSV = []
    setColumns(keys)
    for (let idx = 0; idx < content.length; idx++) {
      let parsed: Record<string, string> = {}
      for (let j = 0; j < content[idx].length; j++) {
        if (!keys[j]) continue
        parsed[keys[j].toLowerCase()] = content[idx][j]
      }
      CSV.push(parsed)
    }
    setParsedCSV(CSV)
  }

  const handleClose = () => {
    setClose()
    setColumns(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl min-h-96">
        <DialogHeader>
          <DialogTitle>Add data for {placeholder?.title}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-8 gap-4">
          <div className="grid col-span-4 items-center gap-4">
            <CSVReader onFileLoaded={handle_CSV} />
          </div>
          <div className="grid col-span-4 items-center gap-4 max-h-96 overflow-y-auto">
            <div className="fixed top-4">
              <Title size='xs' title={"Select column: " + (column ?? "")} />
            </div>
            <SelectCSV onSelect={(column) => setColumn(column)} csv={columns} />
          </div>
        </div>
        <DialogFooter className="items-end">
          <Button onClick={onSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConnectDataWithPlaceholder