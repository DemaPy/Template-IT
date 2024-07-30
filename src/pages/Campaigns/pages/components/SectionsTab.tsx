import ListView from "@/components/List"
import Title from "@/components/Title"
import Section from "./Section"

type Props = {
    campaign: Campaign
    sortedSections: Section[]
}

const SectionsTab = ({ campaign, sortedSections }: Props) => {
    return (
        <div className='flex flex-col gap-4'>
            <Title size='sm' title={"Connect data with placeholders"} />
            <ListView campaign={campaign} component={Section} items={sortedSections} />
        </div>
    )
}

export default SectionsTab