import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { removeLoginPage, toogleLoginPageView } from "../utilis/loginSlice";
import { useNavigate } from "react-router-dom";
import { LOGO_IMG } from "../utilis/constant";

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(store => store.user);
    const showLoginpage = useSelector(store => store.login?.showLoginpage)
    const handleLoginPageClick = () => {
        dispatch(toogleLoginPageView())
        navigate("/login")  
        if (showLoginpage){
            navigate("/")
         }
    }
    
    return(
        <div className="header flex justify-between px-14 ">
             <div className="logo">
                <img src={LOGO_IMG} className="w-20 max-h-28 p-4" alt="logo"/>
             </div>
             <div className="Search">
                <form className="relative px-3">
                <i className="fa-solid fa-magnifying-glass absolute top-[35%] left-[5%]"></i>
                    <input type="text"className="border border-black text-left py-2 pl-10   rounded-3xl" placeholder=" Search Songs" size="70"/>
                </form>
                
             </div>
             <div>
                <div>
                    <button className="btn border border-white py-2 px-10 font-bold text-white" onClick={handleLoginPageClick}>{showLoginpage ? "Home Page" : "Login"}</button>

                </div>
             </div>
        </div>
    )
}
export default Header