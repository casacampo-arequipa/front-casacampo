import { Outlet } from "react-router-dom"
import MainHeader from "../organisms/MainHeader"
import MainMenu from "../molecules/header/MainMenu"
const App = () => {
    return (
        <div>
            <MainHeader>
                <MainMenu />
            </MainHeader>
            <div className="contar mx-auto pt-20 md:pt-16 lg:pt-28  ">
                <Outlet />
            </div>

        </div>
    )
}
export default App