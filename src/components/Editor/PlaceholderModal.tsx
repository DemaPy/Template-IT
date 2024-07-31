import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useEffect, useRef } from 'react'



const PlaceholderModal = ({ x, y, onClose, onSubmit }: TPlaceholderModal) => {
    const ref = useRef<HTMLDivElement | null>(null)

    const xPosition = x + "px"
    const yPosition = y + "px"

    // useOutside hook
    useEffect(() => {

        if (!ref.current) return

        const handleCloseModal = (ev: MouseEvent | TouchEvent) => {
            const target = ev.target as HTMLDivElement
            if (ref.current === target) {
                onClose()
            }
        }

        ref.current.addEventListener("click", handleCloseModal)
        ref.current.addEventListener('touchstart', handleCloseModal);
        return () => {
            if (!ref.current) return
            ref.current.removeEventListener("click", handleCloseModal)
            ref.current.removeEventListener('touchstart', handleCloseModal);
        }
    }, [onClose])

    return (
        <>
            <div ref={ref} className='fixed inset-0 backdrop-blur-sm z-50' />
            <div className='rounded-md bg-white absolute shadow-md p-4 space-y-2 z-[60]' style={{ left: xPosition, top: yPosition }}>
                <PlaceholderForm onSubmit={onSubmit} />
            </div>
        </>
    )
}

function PlaceholderForm({ onSubmit }: { onSubmit: TPlaceholderModal['onSubmit'] }) {
    const { handleSubmit, register, formState: { } } = useForm<PlaceholderOnSubmit>({
        defaultValues: {
            fallback: "",
            title: ""
        }
    })

    return (
        <form onSubmit={handleSubmit(({ fallback, title }) => onSubmit({ fallback, title }))} className='space-y-2'>
            <div className='space-y-1'>
                <Label htmlFor='title'>Title</Label>
                <Input id='title' type='text' {...register("title", {
                    required: "Enter title",
                    minLength: {
                        value: 3,
                        message: "Title too short"
                    }
                })} />
            </div>
            <div className='space-y-1'>
                <Label htmlFor='fallback'>Fallback</Label>
                <Input id='fallback' type='text' {...register("fallback", {
                    required: "Enter fallback",
                    minLength: {
                        value: 3,
                        message: "Fallback too short"
                    }
                })} />
            </div>
            <Button variant={"outline"} className='w-full'>Add placeholder</Button>
        </form>
    )
}

export default PlaceholderModal