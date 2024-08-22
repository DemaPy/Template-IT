import { ChangeEvent, useState } from 'react'
import { Textarea } from '../ui/textarea'
import { extractFields } from './utils/extractFields'
import { ParsedTemplate } from './types'

type MustacheEditorProps = {
    setContent: (template: ParsedTemplate) => void
}

const MustacheEditor = ({ setContent }: MustacheEditorProps) => {
    const [error, setError] = useState("")
    const handleChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
        const template = ev.target.value
        try {
            const parsedTemplate = extractFields({ template })
            // @ts-ignore
            setContent(parsedTemplate)
            setError("")
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        }

    }

    return (
        <>
            <Textarea rows={20} className='resize-none' onChange={handleChange}></Textarea>
            {
                error && (
                    <p className="text-sm mt-2 text-red-300 text-muted-foreground">
                        {error}
                    </p>
                )
            }
        </>
    )
}

export default MustacheEditor