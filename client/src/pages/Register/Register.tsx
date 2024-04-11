import React, { useEffect, useState } from 'react'
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import InputField from '../../components/InputField/InputField';
import { ChevronRight, Link2 } from 'lucide-react';
import { useRegisterMutation } from '../../app/api/userApiSlice';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [
    register,
    status
  ] = useRegisterMutation();
  
  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const body = {
        name,
        username,
        email,
        password
      }

      await register(body);
      
      // TF: Why of which dick this is not working - it doesn`t redict me on login page
      // setTimeout(() => {
      //   status.isSuccess && navigate("/login")
      // }, 1000);
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      status.isSuccess && navigate("/login")
    }, 1000);
  }, [status.isSuccess]);
  
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <form onSubmit={handleRegister} className='flex flex-col justify-center items-center w-full md:w-2/3 lg:w-1/3 p-8 shadow-md rounded-md relative' autoComplete='off'>
        <div className='w-full text-2xl mb-4 font-semibold'>
          Napravite nalog
        </div>
        {status.isLoading && "Vas zahtev se obradjuje"}
        {status.isSuccess && "Uspesno ste napravili nalog"}
        {status.isError && "Greska, pokusajte ponovo!"}
        <InputField id='name' placeholder='Unesite ime' value={name} onChange={(e) => setName(e.target.value)} >
          <>
            { 
              status.isError &&
              name.length < 8 ? "Ime mora sadrzati 8 karaktera" : ""
            }
          </>
        </InputField>
        <InputField id='username' placeholder='Unesite username' value={username} onChange={(e) => setUsername(e.target.value)} >
          <>
            { 
              status.isError &&
              username.length < 8 ? "Korisnicko ime mora sadrzati 8 karaktera" : ""
            }
          </>
        </InputField>
        <InputField id='email' type="email" placeholder='Unesite email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputField id='password' type='passowrd' placeholder='Unesite sifru' value={password} onChange={(e) => setPassword(e.target.value)} >
          <>
            { 
              status.isError &&
              password.length < 8 ? "Sifra mora sadrzati 8 karaktera" : ""
            }
          </>
        </InputField>
        <Link className='absolute bottom-0 left-0 py-2 px-4 text-sm flex gap-2 text-gray-400 hover:text-gray-950 transition' to={'/login'}>Imate nalog? Prijavi se <Link2 /></Link>
        <SubmitButton disabled={status.isLoading || status.isSuccess} style='flex justify-center items-center gap-2 hover:bg-black/85 mb-3'>
          <>
            Napravi nalog
            <ChevronRight />
          </>
        </SubmitButton >
      </form>
    </div>
  )
}

export default Register