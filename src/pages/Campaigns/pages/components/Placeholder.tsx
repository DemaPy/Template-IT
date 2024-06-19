
type Props = {
    item: Placeholder
}

const Placeholder = ({ item }: Props) => {
    return (
        <div className='flex w-full justify-between gap-2 items-center' key={item.id}>
            <p className="p-2 border rounded-md grow text-sm" >Name: {item.title} | Position: {item.position}</p>
        </div>
    )
}

export default Placeholder