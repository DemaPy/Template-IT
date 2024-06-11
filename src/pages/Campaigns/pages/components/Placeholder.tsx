import { Button } from '@/components/ui/button'

type Props = {
    item: Placeholder
    handleClick: (item: Placeholder) => void
}

const Placeholder = ({ item, handleClick }: Props) => {
    return (
        <div className='flex w-full justify-between gap-2 items-center' key={item.id}>
            <p className="p-2 border rounded-md grow text-sm" >Name: {item.title} | Position: {item.position}</p>
            <Button variant={"outline"} onClick={() => handleClick(item)}>Add data</Button>
        </div>
    )
}

export default Placeholder