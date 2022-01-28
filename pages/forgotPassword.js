import React, { useState } from 'react';
import Meta from '../Components/Meta';
import { server } from '../config'
import axios from 'axios'
import ForgotPopup from '../Components/ForgotPopup';

function ForgotPassword({ errorForget, setErrorForget, email, setEmail, errorEmail, checkInputs}) {
  const [isOpenup, setIsOpenup] = useState(false);
    
    const togglePopupnow = () => {
      setIsOpenup(!isOpenup);
    }
    const ForgetPasswordSubmit = async (e) => {
        e.preventDefault();
        checkInputs();
        const details = { email }
        try {
          const response = await axios.post(`${server}/users/forgotPassword`, details);
          setEmail('');
          setErrorForget("")
          togglePopupnow() 
        } catch (err) {
          console.log(`Error: ${err.message}`);
            setErrorForget('failed, Please try again');
        }
      
      }
  return <>
            <Meta title='Forget Password Page'/>
            <div className="container max-w-screen-sm mx-auto md:min-h-screen h-screen">
               <div className=" my-28 px-9 ">
                    <form className="space-y-7" onSubmit={ForgetPasswordSubmit}>
                        <div className="">
                        <label htmlFor="email" className="block mb-2 text-base">Email</label>
                        <input type="email" name="email" className="border-2 border-borderColor py-2.5 rounded-lg pl-4 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errorEmail && <span className=" text-xs text-red-600">{errorEmail}</span>}
                        </div>
                        
                        <button className="bg-btn p-3 mx-auto rounded-lg text-white w-full hover:bg-blue-500 transition ease-in-out duration-300">Submit</button>
                        {errorForget && <span className=" text-xs text-red-600">{errorForget}</span>}

                        
                    </form>

                    {isOpenup && <ForgotPopup
                      content={<>
                        <h2 className='uppercase mb-3 text-lg'>Forgot password</h2>
                        <p>Token have been sent to your email!</p>
                      </>}
                    />}

                </div>
            </div>    
        </>;
}

export default ForgotPassword;

