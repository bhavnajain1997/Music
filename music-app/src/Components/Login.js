import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import checkValidData from "../utilis/validate"
import Header from "./Header"
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utilis/firebase";
import addUser from "../utilis/userSlice"
import { useNavigate } from "react-router-dom";
import { LOGO_IMG } from "../utilis/constant";
const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const[errorMessage,setErrorMessage] = useState(true);
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
     const navigate = useNavigate();
    const dispatch = useDispatch();
     
   const handleButtonClick = ()=>{
    if (name == null) {
        var   message = checkValidData(email.current.value, password.current.value, name.current.value);
        setErrorMessage(message);
    }
    else{
        var message = checkValidData(email.current.value, password.current.value);
          setErrorMessage(message)
    }
      if (message) return; 


        // console.log(email.current.value);
        // console.log(password.current.value);

    if(!isSignInForm){
        createUserWithEmailAndPassword(auth,
            email.current.value,
             password.current.value)
         .then((userCredential) => {
           // Signed up 
           updateProfile(auth.currentUser, {
               displayName: name.current.value
             }).then(() => {
               // Profile updated!
               const {uid, email, displayName} = auth.currentUser;
               dispatch(addUser({uid: uid, email : email, displayName : displayName}))
               // ...
             }).catch((error) => {
               // An error occurred
               setErrorMessage(errorMessage)
               // ...
             });
           const user = userCredential.user;
       
           // ...
         })
         .catch((error) => {
           const errorCode = error.code;
           const errorMessage = error.message;
           // ..
           setErrorMessage(errorCode + "-" + errorMessage)
         });
        
    }
    else{
        signInWithEmailAndPassword(auth, 
            email.current.value,
             password.current.value)
           .then((userCredential) => {
             // Signed in 
             const user = userCredential.user;
             // ...
             navigate("/")
           })
           .catch((error) => {
             const errorCode = error.code;
             const errorMessage = error.message;
             setErrorMessage(errorCode + "-" + errorMessage)
           });
      
          
    }
   }
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }
    return (
        <div className="">
            <Header/>
            <div className="bg-zinc-950 w-5/12  shadow-2xl rounded-xl left-[28%] my-0 mx-auto">
            <form className=" px-20 py-24 text-white" onSubmit={(e)=>e.preventDefault()}>
            <img className="w-16 m-auto " src={LOGO_IMG}/>
            <h1 className="text-center text-3xl text-white font-semibold my-4 mx-auto mb-10">{isSignInForm ? "Log in to Spotify": "Sign Up to Spotify"}
            </h1>
            {!isSignInForm && <div>
            <label className="w-full text-white">Name</label>
            <input className="w-full my-2 mb-4 p-2 py-3 rounded bg-zinc-950 border border-white text-lg focus:text-white"  type="text" placeholder="Name"/>
            </div>}
            <label className="w-full text-white">Email</label>
            <input ref={email} className="w-full my-2 mb-4 p-2 py-3 rounded bg-zinc-950 border border-white text-lg focus:text-white"  type="text" placeholder="Email"/>
            <label className="w-full text-white my-2 ">Password</label>
            <input ref={password} className="w-full my-2 mb-4 p-2 py-3 rounded bg-zinc-950 border border-white text-lg focus:text-white" type="password" placeholder="Password" />
            <p>{errorMessage}</p>
            <div className="flex justify-center">
            <button className="btn w-7/12 mx-auto my-5 bg-green-600 text-black font-bold px-6 py-4 text-center rounded-3xl" onClick={handleButtonClick}>{isSignInForm ? "Log In" : "Sign Up"}</button>

            </div>
            <p className="text-center">Forget Your Password?</p>
            <p className="text-center" onClick={toggleSignInForm}>{isSignInForm ? "Don't have an account? Sign up for Spotify" : "Already Registered? Sign In Now"}</p>
        </form>
            </div>
        
    </div>
    )
   
}

export default Login