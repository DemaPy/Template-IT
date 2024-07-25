import { DataToReturn } from './Section';
import SectionItemData from './SectionItemData';

type Props = {
  data: DataToReturn | null
}

const SectionData = ({ data }: Props) => {

  if (!data) return 

  return (
    <>
      {data?.map(placeholder => <SectionItemData key={placeholder.id} placeholder={placeholder}  />)}
    </>
  )
}

export default SectionData 