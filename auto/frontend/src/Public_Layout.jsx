import Header from "./components/header/Public_Header"
import Footer from "./components/footer/Footer"
import { Outlet } from "react-router-dom"

function PublicLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default PublicLayout
