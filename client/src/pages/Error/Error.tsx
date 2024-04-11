import { ShieldCheck } from 'lucide-react'
import SubmitButton from '../../components/SubmitButton/SubmitButton'

const Error = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
        <SubmitButton style='flex w-full md:w-1/4 flex-col justify-center items-center gap-2 mb-3 text-white shadow-md'>
			<div className='text-3xl'>
				Error 404! 
			</div>
			<div className='text-2xl'>
				Page not found!
			</div>
			<ShieldCheck size={50} className='text-green-400' />
        </SubmitButton>
    </div>
  )
}

export default Error