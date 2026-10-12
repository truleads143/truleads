import { Header, Footer, LucyAI } from "./component/index"
import { Outlet } from "react-router-dom"

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />

            {/* Lucy AI floating widget */}
            <LucyAI />
        </>
    )
}

export default Layout
