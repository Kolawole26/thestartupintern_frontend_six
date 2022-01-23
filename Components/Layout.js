import Meta from './Meta'
import Footer from './Footer'
function Layout({children}) {
 

    return (
        <>
            <Meta/>
            <main >
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout
