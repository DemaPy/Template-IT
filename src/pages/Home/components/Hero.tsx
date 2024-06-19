import Title from '../../../components/Title'

const Hero = () => {
  return (
    <section className='flex items-center justify-center h-screen text-center select-none'>
      <div className='max-w-3xl'>
      <Title size={"lg"} title={
        `
        Create templates
        and swap content easily
        by connecting to spreadsheet's
        or import CSV files
      `
      } />
      </div>
    </section>
  )
}

export default Hero