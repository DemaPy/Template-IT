import Title from '../../../components/Title'

const Hero = () => {
  return (
    <section className='flex items-center justify-center h-screen text-center select-none relative'>
      <div className='absolute cursor-pointer hover:scale-105 transition-all rounded-full text-stone-100 text-lg flex font-semibold items-center justify-center px-4 py-2 top-1/3 bg-gradient-to-tr from-slate-900 to-blue-950'>enroll now for <span className='text-blue-400 mx-2'>free</span></div>
      <div className='container'>
      <Title size={"lg"} title={
        `
        Create templates,
        swap content
        and render sections conditioonally
        with integrated services
      `
      } />
      </div>
    </section>
  )
}

export default Hero