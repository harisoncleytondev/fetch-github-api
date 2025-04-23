import Home from './pages/home/Home'
import Result from './pages/result/Result'
import Button from './components/Button/Button'
import { Outlet } from "react-router"

export default function App() {

  return (
    <div>
        <Home/>
        <Outlet/>
    </div>

  )
}
