import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useEffect, useRef } from 'react'

type TPlaceholderModal = {
    x: number,
    y: number,
    handler: () => void
}

const PlaceholderModal = ({ x, y, handler }: TPlaceholderModal) => {
    const ref = useRef<HTMLDivElement | null>(null)

    const xPosition = x + "px"
    const yPosition = y + "px"

    // useOutside hook
    useEffect(() => {

        if (!ref.current) return

        const handleCloseModal = (ev: MouseEvent | TouchEvent) => {
            const target = ev.target as HTMLDivElement
            if (ref.current === target) {
                handler()
            }
        }

        ref.current.addEventListener("click", handleCloseModal)
        ref.current.addEventListener('touchstart', handleCloseModal);
        return () => {
            if (!ref.current) return
            ref.current.removeEventListener("click", handleCloseModal)
            ref.current.removeEventListener('touchstart', handleCloseModal);
        }
    }, [handler])

    return (
        <div ref={ref} className='fixed inset-0 backdrop-filter backdrop-blur-sm z-50'>
            <div className='rounded-md bg-white absolute shadow-md p-4 space-y-2' style={{ left: xPosition, top: yPosition }}>
                <PlaceholderForm />
            </div>
        </div>
    )
}

type FormValues = {
    title: string,
    fallback: string
}
function PlaceholderForm() {
    const { handleSubmit, register, formState: { } } = useForm<FormValues>({
        defaultValues: {
            fallback: "",
            title: ""
        }
    })

    return (
        <form onSubmit={handleSubmit(({ fallback, title }) => console.log({ fallback, title }))} className='space-y-2'>
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