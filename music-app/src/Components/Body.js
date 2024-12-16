import { BG_IMG } from "../utilis/constant";
import Header from "./Header";
import Login from "./Login";
import Music from "./Music"
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
        path : "/",
        element : <Music/>
    },
    {
      path : "/login",
      element : <Login/>
    }

  ])

    return(
        <div className="bg-gradient-to-br from-black aspect-video">
                        <img className="fixed -z-10 w-screen" src={BG_IMG}/>

            <div className=" w-screen h-screen  ">
             <RouterProvider router = {appRouter}/>
        </div>
        </div>
        
    )
}

export default Body