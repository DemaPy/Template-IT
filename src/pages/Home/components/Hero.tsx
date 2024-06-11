import Title from '../../../components/Title'

const Hero = () => {
  return (
    <section className='flex items-center justify-center pt-40 text-center select-none'>
      <Title size={"lg"} title={<p className='leading-relaxed'>Automate your <span className='font-bold bg-blue-300 rounded-md p-4 text-white'>Templates</span> and swap <br /><span className='font-bold bg-yellow-300 rounded-md p-4 text-white'>Content</span> easily by connecting <br />
        to your <span className='font-bold bg-lime-700 rounded-md p-4 text-white'>Spreadsheet's</span></p>} />
    </section>
  )
}

export default Hero