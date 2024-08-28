import { PropsWithChildren } from 'react'


const PageItemsWrapper = ({children}: PropsWithChildren) => {
  return (
    <div className='bg-white flex-1 rounded-md'>{children}</div>
  )
}

export default PageItemsWrapper