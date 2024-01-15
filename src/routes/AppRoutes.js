import React from 'react'
import { Navigate, Route, Routes, } from 'react-router-dom'
import About from '../components/About'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import WayPoints from '../components/WayPoints'
import PrivateRoute from './PraviateRoute'

export default function AppRoutes() {

 const routes =[
    {
        path:"/about",
        page:"About",
        element:<About />,
        isPrivate:false,
        Key:"About"
    },
    {
        path:"/login",
        page:"Login",
        element:<Login />,
        isPrivate:false,
        Key:"Login"
    },
    {
        path:"/signup",
        page:"SignUp",
        element:<SignUp />,
        isPrivate:false,
        Key:"SignUp"
    },
    {
        path:"/dashboard",
        page:"Home",
        element:<WayPoints />,
        isPrivate:true,
        Key:"Home"
    },
 ]

  return (

    <Routes>
        {routes.map(({isPrivate,element,path})=>{
            return isPrivate?<Route  path={path} element={<PrivateRoute>
                {element}
              </PrivateRoute>}>
              </Route>:<Route exact path={path} element={element}/>
        })
        }
        <Route path="/" element={<Navigate to={"/dashboard"}/>} />
    </Routes>
  )
}
