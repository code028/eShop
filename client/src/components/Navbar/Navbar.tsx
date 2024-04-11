import { GanttChart, LogIn, LogOut, UsersRound } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { Link, useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../../app/api/sessionApiSlice"
import { useLocation } from "react-router-dom"
import { useState } from "react"

export interface INavbar {
  HamOpen: boolean,
  isHamOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar: React.FC<INavbar> = ({HamOpen, isHamOpen}) => {

  const location = useLocation();
  
  const navigate = useNavigate();
  const session = useSelector((state: RootState) => state.session);

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
    <div className={`${ (location.pathname == "/login" || location.pathname == "/register") ? "absolute" : "sticky" } top-0 left-0 w-full h-fit p-5 bg-white z-[1500] `}>
      <div className="w-full h-fit flex justify-between">
          <div className="flex gap-2 items-center">
            <Link to={'/'} className="text-2xl shadow-lg py-2 px-4 font-semibold rounded-md">eShop</Link>
          </div>
          <div>
            { !session.refreshToken ? 
              <div className="flex justify-center items-center gap-7">
                <Link to={"/login"} className="flex gap-2 items-center">
                  Prijavi se
                  <LogIn />
                </Link>
                <Link to={"/register"} className="flex gap-2 items-center">
                  Napravi nalog
                  <UsersRound />
                </Link>
              </div>
              :
              <>
                <div className="hidden md:flex justify-center items-center gap-3">
                  <Link to={"/"} className="shadow-lg py-2 px-4 font-semibold rounded-md">
                    Kupovina
                  </Link>
                  <Link to={`/profile/${session.user.id}`} className="shadow-lg py-2 px-4 font-semibold rounded-md">
                    Profil
                  </Link>
                  <Link to={'/product/add'} className="shadow-lg py-2 px-4 font-semibold rounded-md">
                    Dodavanje proizvod
                  </Link>
                  <button onClick={handleLogout} className="shadow-lg py-2 px-4 font-semibold rounded-md">
                    <LogOut />
                  </button>
                </div>
                <div className="flex justify-center items-center gap-3">
                  <button onClick={() => isHamOpen(!HamOpen)} className="flex md:hidden shadow-xl py-2 px-4 font-semibold rounded-md ">
                      <GanttChart />
                  </button>
                  <button onClick={handleLogout} className="shadow-lg py-2 px-4 md:hidden font-semibold rounded-md">
                    <LogOut />
                  </button>
                </div>
              </>
            }
          </div>
      </div>
    </div>
  )
}

export default Navbar
