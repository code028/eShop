import { useState } from 'react'
import { Link2, LogIn } from 'lucide-react'
import { useLoginMutation } from '../../app/api/sessionApiSlice'
import InputField from '../../components/InputField/InputField'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import { Link } from 'react-router-dom'

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [ login, status ] = useLoginMutation();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const body = {
        username,
        password
      }  
      await login(body);

    } catch (error) {
      console.error(error);
    }
  }

  console.log(status.isError);
  
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <form onSubmit={handleLogin} className='flex flex-col justify-center items-center w-full md:w-2/3 lg:w-1/3 p-8 shadow-md rounded-md relative' autoComplete='off'>
        <div className='w-full text-2xl mb-4 font-semibold'>
          Prijavite se
        </div>
        {status.isLoading && "Vas zahtev se obradjuje"}
        {status.isSuccess && "Uspesno ste se prijavili"}
        {status.isError && "Greska, pokusajte ponovo"}
        <InputField id='email' placeholder='Unesite email' value={username} onChange={(e) => setUsername(e.target.value)} />
        <InputField id='password' type='password' placeholder='Unesite sifru' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Link className='absolute bottom-0 left-0 py-2 px-4 text-sm flex gap-2 text-gray-400 hover:text-gray-950 transition' to={'/register'}>Nemate nalog? Napravite novi <Link2 /></Link>
        <SubmitButton disabled={status.isLoading || status.isSuccess} style='flex justify-center items-center gap-2 hover:bg-black/90 mb-3'>
          <>
            Prijavite se
            <LogIn />
          </>
        </SubmitButton>
      </form>
    </div>
  )
}

export default Login