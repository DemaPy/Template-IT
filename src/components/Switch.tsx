import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function Switchh({ text, isActive, isDisabled, onChange }: { text: string, isActive: boolean, isDisabled: boolean, onChange: (value: boolean) => void}) {
  return (
    <div className="flex items-center space-x-2">
      <Switch disabled={isDisabled} id="airplane-mode" checked={isActive} onCheckedChange={onChange}/>
      <Label htmlFor="airplane-mode">{text}</Label>
    </div>
  )
}
