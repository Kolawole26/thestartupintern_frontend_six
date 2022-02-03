import Link from 'next/link';
import ReorderIcon from '@mui/icons-material/Reorder';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Cookies from 'js-cookie'



function Navigation( {onClick, active, links} ) {

    const RemoveCookie = () => {
        Cookies.remove('user')
    }
    

    return (
        <>
           <header className="relative bg-primary py-3">
               <div className=" mx-auto max-w-7xl flex items-center justify-between py-2.5 md:px-12 px-9">
                   <div className="">
                       <h1 className="text-white font-bold md:text-xl italic">Eventful Momemts.</h1>
                   </div>

                    <div onClick={onClick} className={`md:hidden`}>
                        { !active ? <button className='py-1 px-2 bg-black rounded'>
                            <ReorderIcon className="text-white stroke-current stroke-1 "/>
                            </button> : <button className='py-1 px-2 bg-black rounded'>
                                <CancelPresentationIcon className="text-white stroke-current stroke-1 "/>
                            </button> }
                    </div>
                   <nav className={`${!active && 'hidden'} absolute flex-col top-full w-full left-0 z-20 md:static md:w-auto  md:flex bg-primary`}>
                       <ul className="md:flex-row md:flex">
                           {links ? 
                            <>
                                 <li className="list-none md:mr-5">
                                <Link href='/' > 
                                <a className=" flex w-full text-base cursor-pointer pt-2.5 px-9 md:px-2.5 text-white">Login</a>
                                </Link>
                           </li>
                           <li className="list-none md:mr-5 ">
                                <Link href='/register'>
                                <a className=" flex w-full text-base cursor-pointer pt-2.5 px-9 md:px-2.5 text-white mb-7">Register</a>   
                                </Link>
                           </li>
                            </> 
                            :
                            <>
                                <li className="list-none md:mr-5">
                                <Link href='/'>
                                <a className=" flex w-full text-base cursor-pointer pt-2.5 px-9 md:px-2.5 text-white" onClick={RemoveCookie}>Logout</a>    
                                </Link>
                           </li>
                           <li className="list-none md:mr-5 ">
                                <Link href='/buckets'>
                                <a className=" flex w-full text-base cursor-pointer pt-2.5 px-9 md:px-2.5 text-white mb-7">My Bucket</a>
                                </Link>
                           </li>
                            </>  
                        }
                       </ul>
                   </nav>
               </div>
           </header>  
        </>
    )
}

export default Navigation
