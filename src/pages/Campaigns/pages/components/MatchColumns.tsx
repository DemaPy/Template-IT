import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

type Props = {
    placeholders: Placeholder[]
    columns: string[] | null
    onSubmit: (value: Record<string, string>) => void
}

const MatchColumns = ({ columns, placeholders, onSubmit }: Props) => {
    const [matched, setMatched] = useState<Record<string, string> | null>(null)
    
    useEffect(() => {
        if (!columns || !placeholders) return
        const matched: Record<string, string> = {}
        for (const placeholder of (placeholders || [])) {
            for (const column of columns || []) {
                if (placeholder.title.toLowerCase() === column.toLowerCase()) {
                    matched[placeholder.id] = column
                }
            }
        }
        setMatched(matched)
    }, [columns, placeholders])

    const handleMatchColumns = () => {
        onSubmit(matched!)
        setMatched(null)
    }

    return (
        <div className='absolute w-full top-36'>
            {
                matched && (
                    <div className="flex flex-col gap-2 p-2 bg-slate-300 rounded-md">
                        <p className="text-sm font-semibold">Match columns?</p>
                        <div className="flex items-center gap-2">
                            <Button size={"sm"} variant={"ghost"} className="px-2 py-1 w-full" onClick={() => setMatched(null)}>No</Button>
                            <Button size={"sm"} variant={"outline"} className="px-2 py-1 w-full" onClick={handleMatchColumns}>Yes</Button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default MatchColumns