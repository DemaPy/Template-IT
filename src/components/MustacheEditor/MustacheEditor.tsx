import { ChangeEvent } from 'react'
import { Textarea } from '../ui/textarea'

type MustacheEditorProps = {
    setContent: (template: string) => void
    value: string
}

const MustacheEditor = ({ value, setContent }: MustacheEditorProps) => {
    const handleChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
        const template = ev.target.value
        setContent(template)
    }

    return (
        <Textarea defaultValue={value} rows={20} className='resize-none' onBlur={handleChange}></Textarea>
    )
}

export default MustacheEditor