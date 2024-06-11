import { DataToReturn } from './Section';
import SectionItemData from './SectionItemData';

type Props = {
  data: DataToReturn
}

const SectionData = ({ data }: Props) => {

  return (
    <>
      {data?.map(placeholder => <SectionItemData key={placeholder.id} placeholder={placeholder}  />)}
    </>
  )
}

export default SectionData 