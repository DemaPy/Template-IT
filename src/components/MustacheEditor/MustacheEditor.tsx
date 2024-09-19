import { ChangeEvent, useState } from 'react'
import { Textarea } from '../ui/textarea'
import { ParsedTemplate } from './types'

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
        <Textarea value={value} rows={20} className='resize-none' onChange={handleChange}></Textarea>
    )
}

export default MustacheEditor