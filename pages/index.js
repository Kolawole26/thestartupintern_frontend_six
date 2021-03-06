import Meta from '../Components/Meta';
import Link from 'next/link';
import { useEffect, useState } from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { server } from '../config'
import axios from 'axios'
import Cookies from 'js-cookie'
import Popup from '../Components/Popup';


export default function Home({firstLinks, email, setEmail, password, setPassword, errorEmail, errorPassword, errorLogin, setErrorLogin, checkInputs}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    firstLinks()

 });

 useEffect(() => {
  window.OneSignal = window.OneSignal || [];
  OneSignal.push(function () {
      OneSignal.init({
          appId: "f0e3643b-1f82-4319-bd22-92bbdf71a525",
      });
  });

  return () => {
      window.OneSignal = undefined;
  };
}, []); // <-- run this effect once on mount

const togglePopup = () => {
  setIsOpen(!isOpen);
}

 

 const LoginSubmit = async (e) => {
  e.preventDefault();
  checkInputs();
  const details = { email, password}
  try {
    const response = await axios.post(`${server}/users/login`, details);
    setEmail('');
    setPassword('');
    Cookies.set('user', JSON.stringify(response.data), { expires: 24, path: '/' })
    setErrorLogin("");
    togglePopup();
  } catch (err) {
    
    console.log(`Error: ${err.message}`);
      setErrorLogin('Login failed, Please try again');
      
  }

}

  return (
    < >
      <Meta title='Login Page'/>

      <div className="container max-w-screen-sm mx-auto">
               <div className=" my-28 px-9 ">
                <h1 className="md:text-4xl font-bold text-3xl mb-3">Welcome back,</h1>
                <p className="md:text-xl text-base mb-4">
                    Hi, my name is Eventful Moments, I am a bucket... no, not the 
                    bucket of water but i store awesome moments you will like to have in coming years.
                    </p>

                    <form className="space-y-7" onSubmit={LoginSubmit}>
                        <div className="">
                        <label htmlFor="email" className="block mb-2 text-base">Email</label>
                        <input type="email" name="email" className="border-2 border-borderColor py-2.5 rounded-lg pl-4 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errorEmail && <span className=" text-xs text-red-600">{errorEmail}</span>}
                        </div>
                        <div className="">
                        <label htmlFor="password" className="block mb-2 text-base">Password</label>
                        <input type="password" name="password" className="border-2 border-borderColor mb-4 py-2.5 rounded-lg pl-4 w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errorPassword && <span className=" text-xs text-red-600">{errorPassword}</span>}
                        </div>
                        <button className="bg-btn p-3 mx-auto rounded-lg text-white w-full hover:bg-blue-500 transition ease-in-out duration-300">Login</button>
                        {errorLogin && <span className=" text-xs text-red-600">{errorLogin}</span>}

                        <h4 className="text-btn text-sm"><Link href='/forgotPassword'>Forgot Password</Link></h4>
                        <h4 className="text-btn text-sm"><Link href='/register'>Sign up </Link> <ArrowRightAltIcon/></h4>
                    </form>

                    {isOpen && <Popup
                      content={<>
                        <h2 className='uppercase mb-3 text-sm md:text-lg'>Login</h2>
                        <p className='text-sm md:text-lg'>Welcome !!! You have successfully login</p>
                      </>}
                    />}

<button
  type="button"
  onClick={() => {
    throw new Error("Sentry Frontend Error");
  }}
>
  Throw error
</button>

               </div>

                  
           </div>
    </>
  )
}
