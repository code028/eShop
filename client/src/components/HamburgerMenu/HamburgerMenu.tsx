import { LogOut } from "lucide-react"
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { useLogoutMutation } from "../../app/api/sessionApiSlice"

export interface IHamburgerMenu {
	isOpen: boolean,
	style?: string
  	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const HamburgerMenu: React.FC<IHamburgerMenu> = ({isOpen, style, setIsOpen}) => {
	const session = useSelector((state: RootState) => state.session);

	const navigate = useNavigate();

	const [ logout, logoutState ] = useLogoutMutation();

	const handleLogout = async () => {
		try {
		  const body = {
			refreshToken : session.refreshToken
		  }
	
		  await logout(body);
		  navigate('/login');
		} catch (error) {
		  console.error(error);
		}
	
	  }

  return (
	<div className={`w-full h-full bg-white flex justify-center items-center overflow-y-hidden ${!isOpen ? " hidden -z-[10] " : " absolute z-[1000] " } ` + style} >
		<div className="w-full h-full absolute bg-white flex flex-col justify-center items-center top-0 l-0 text-black overflow-y-scroll">
			<Link to={"/"} onClick={() => setIsOpen(false)} className="shadow-lg py-2 px-4 w-2/4 flex justify-center my-2 font-semibold rounded-md">
				Kupovina
			</Link>
			<Link to={`/profile/${session.user.id}`} onClick={() => setIsOpen(false)} className="shadow-lg py-4 px-4 w-2/4 flex justify-center my-2 font-semibold rounded-md">
				Profil
			</Link>
			<Link to={'/product/add'} onClick={() => setIsOpen(false)} className="shadow-lg py-4 px-4 w-2/4 flex justify-center my-2 font-semibold rounded-md">
				Dodavanje proizvoda
			</Link>
			<Link to={`/user/${session.user.id}/cart`} onClick={() => setIsOpen(false)} className="shadow-lg py-4 px-4 w-2/4 flex justify-center my-2 font-semibold rounded-md">
				Korpa
			</Link>
		</div>
	</div>
  )
}

export default HamburgerMenu