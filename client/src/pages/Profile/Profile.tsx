import { useEffect, useState } from 'react';
import { CircleUser, KeySquare, MousePointerClick } from 'lucide-react';
import { useParams } from 'react-router-dom'
import InputField from '../../components/InputField/InputField';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { useGetUserByIdQuery, useUpdateUserByIdMutation } from '../../app/api/userApiSlice';

const Profile = () => {
	
	const { id } = useParams();

	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordCheck, setNewPasswordCheck] = useState(false);
	const [hint, setHint] = useState(false);
	

	const {
		data: userData,
		status: userDataStatus
	} = useGetUserByIdQuery(id!,{
		skip: !id
	});

	const [
		updateUser,{
			isLoading: isUpdateUserLoading,
			isSuccess: isUpdateUserSuccess,
			isError: isUpdateUserError
		}
	] = useUpdateUserByIdMutation();

	const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			
			const body = {
				name,
				username,
				email,
				password,
				newPassword	
			};

			const result = await updateUser({id, body}).unwrap();

			console.log(result);
			
		} catch (error) {
			console.error(error);
		}

	};

	useEffect(() => {
		if(userDataStatus) {
			setName(userData?.name!);
			setUsername(userData?.username!);
			setEmail(userData?.email!);
		}
	},[userData])

	return (
		<div className='w-full h-fit flex flex-col select-none'>
			<div className='w-full h-full flex flex-col items-center justify-center p-10'>
				<div className='text-md py-2 shadow-sm px-4 my-5 rounded-md bg-black text-white'>
					{isUpdateUserSuccess && "Promene su uspesno sacuvane"}
					{isUpdateUserLoading && "Vas zahtev se obradjuje"}
					{isUpdateUserError && "Greska, pokusajte ponovo!"}
					{!isUpdateUserLoading && !isUpdateUserSuccess && !isUpdateUserError && <>Podesavanja profila korisnika</>}
				</div>
				<div className="w-full md:w-4/5 flex flex-col md:flex-row items-center shadow-md rounded-md p-5">
					<div className='w-full md:w-1/3 flex flex-col gap-2 justify-center items-center py-5 md:py-0 relative'>
						<CircleUser size={90} className='shadow shadow-black bg-black text-white px-4 py-2 rounded-full cursor-pointer hover:bg-white hover:text-black' onClick={() => setNewPasswordCheck(!newPasswordCheck)} onMouseEnter={() => setHint(true)} onMouseLeave={() => setHint(false)} />
						{
							hint &&	
							<div className='py-1 px-2 bg-black font-semibold text-white rounded-md absolute -bottom-10 text-[14px]'>
								Klikni da promenis sifru
							</div>
						}
					</div>
					<form onSubmit={handleUpdateUser} className="w-full md:full flex flex-col justify-center items-center px-5 py-0  transition duration-500" autoComplete=''>
						<label htmlFor='name' className='w-full flex justify-start px-2 -my-3'>Ime korisnika:</label>
						<InputField id='name' value={name} onChange={(e) => setName(e.target.value)} style='m-0' />
						<label htmlFor='username' className='w-full flex justify-start px-2 -my-3 mt-2'>Username korisnika:</label>
						<InputField id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
						<label htmlFor='email' className='w-full flex justify-start px-2 -my-3 mt-2'>Email korisnika:</label>
						<InputField id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
						<label htmlFor='password' className='w-full flex justify-start px-2 -my-3 mt-2'>Lozinka korisnika:</label>
						<InputField type='password' id='password' placeholder={newPasswordCheck ? "Trenutna lozinka" : 'Lozinka'} value={password} onChange={(e) => setPassword(e.target.value)} />
						{
							newPasswordCheck && 
							<>
								<InputField id='changePass' required disabled={!newPasswordCheck} placeholder="Nova lozinka" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
							</>
						}
						<div className='w-full flex justify-center pt-5'>
							{/* {password.length > 0 && */}
								<SubmitButton disabled={isUpdateUserLoading}  style='w-4/5 lg: md:w-1/2 flex justify-center items-center gap-2 cursor-pointer hover:bg-black/90 '>
									<>
										Sacuvaj promene
										<MousePointerClick />
									</>
								</SubmitButton>
							{/* } */}
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Profile