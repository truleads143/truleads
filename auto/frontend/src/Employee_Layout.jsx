import Header from "./components/header/Employee_Header"
import Footer from "./components/footer/Footer"
import { Outlet } from "react-router-dom"

function EmployeeLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default EmployeeLayout
