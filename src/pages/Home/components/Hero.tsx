import { Button } from '@/components/ui/button'
import Title from '../../../components/Title'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className='flex items-center justify-center h-screen text-center select-none relative'>
      <div className='absolute cursor-pointer hover:scale-105 transition-all rounded-full text-stone-100 text-lg flex font-semibold items-center px-3 py-1 top-1/3 bg-gradient-to-tr from-slate-900 to-blue-950'>enroll now for <span className='text-blue-400 ms-1.5'>free</span></div>
      <div className='container max-w-5xl grid place-items-center'>
        <Title size={"lg"} title={
          `
            Create templates,
            swap content
            and render sections conditioonally
            with integrated services
          `
        } />
        <div className='mt-12 flex gap-2'>
          <Button asChild variant={"ghost"}>
            <Link to={'/login'}>Register</Link>
          </Button>
          <Button className='bg-slate-700' asChild>
            <Link to={'/login'}>Login</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero