import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useAddDataToPlaceholderModal } from "@/store/addDataToPlaceholderModal"
import CSVReader from "react-csv-reader"
import { useCampaignUpdateModal } from "@/store/campaignUpdateModal"
import { Label } from "@/components/ui/label"
import { useSectionUpdateModal } from "@/store/sectionUpdateModal"
import MatchColumns from "./MatchColumns"
import { CampaignService } from "@/services/DI/Campaign"


const ConnectDataWithPlaceholder = ({ campaignId }: { campaignId: Campaign['id'] }) => {
  const [selectedColumns, setSelectedColumns] = useState<Record<string, string>>({})
  const [parsedCSV, setParsedCSV] = useState<any[] | null>(null)
  const [columns, setColumns] = useState<string[] | null>(null)

  const isOpen = useAddDataToPlaceholderModal(state => state.isOpen)
  const setClose = useAddDataToPlaceholderModal(state => state.setClose)
  const section = useSectionUpdateModal(state => state.section)
  const setCampaign = useCampaignUpdateModal(state => state.setCampaign)

  const onSubmit = async () => {
    const result: Record<string, Record<string, string>> = {}
    let data: Record<string, string> = {}
    for (const placeholder_id in selectedColumns) {
      const column = selectedColumns[placeholder_id]
      for (const obj_data of parsedCSV!) {
        data[obj_data.slug] = obj_data[column.toLowerCase()]
      }
      result[placeholder_id] = data
      data = {}
    }
    const response = await CampaignService.savePlaceholderData({ campaignId: campaignId, data: { [section!.id]: result } })
    if (response.status === "error") {
      alert(response.message)
    }
    if (response.status === "success") {
      setCampaign(response.data)
    }
    setClose()
  }

  const handle_CSV = (data: any[]) => {
    const [keys, ...content] = data
    const CSV = []
    let isSlugExist = false
    for (const iterator of keys) {
      if (iterator.toLowerCase() === ("slug")) {
        isSlugExist = true
      }
    }

    if (!isSlugExist) {
      console.error("Slug required")
      return
    }

    setColumns(keys.filter((item: string) => item.toLowerCase() !== "slug"))
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
  }

  const handleSelectColumn = ({ placeholder_id, value }: { placeholder_id: string, value: string }) => {
    if (value === "default") {
      setSelectedColumns(prev => {
        delete prev[placeholder_id]
        const new_obj = {
          ...prev,
        }
        return new_obj
      })
      return
    }
    setSelectedColumns(prev => {
      const new_obj = {
        ...prev,
        [placeholder_id]: value
      }
      return new_obj
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl min-h-96">
        <DialogTitle>Add data</DialogTitle>
        {
          !parsedCSV && (
            <div className="flex items-center justify-center h-full border border-dashed rounded-md">
              <Label className="cursor-pointer text-sm text-slate-400">
                Upload CSV
                <CSVReader onFileLoaded={handle_CSV} />
              </Label>
            </div>
          )
        }
        {
          parsedCSV && columns && (
            <div className="flex flex-col gap-2 w-full">
              {section?.placeholders.map((item, idx) => {
                return (
                  <div className="grid grid-cols-6 gap-2" key={idx}>
                    <p className="text-sm font-semibold border p-2 rounded-md col-span-4">{item.title}</p>
                    <Select
                      value={selectedColumns[item.id] || ""}
                      onValueChange={value => handleSelectColumn({ placeholder_id: item.id, value })}
                    >
                      <SelectTrigger className="col-span-2">
                        <SelectValue placeholder="Select column" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"default"}>Select column</SelectItem>
                        {columns.map((col, idx) => {
                          const isDisabled = Object.values(selectedColumns).includes(col)
                          return <SelectItem disabled={isDisabled} key={idx} value={col}>{col}</SelectItem>
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                )
              })}
            </div>
          )
        }
        <DialogFooter className="items-end relative">
          <Button onClick={onSubmit}>Save changes</Button>
          <MatchColumns onSubmit={(value: Record<string, string>) => setSelectedColumns(prev => {
            return {
              ...prev,
              ...value
            }
          })} columns={columns} placeholders={section?.placeholders!} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConnectDataWithPlaceholder