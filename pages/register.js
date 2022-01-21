import React from 'react'
import Meta from '../Components/Meta';
import { useEffect } from 'react';
import { server } from '../config'
import axios from 'axios'
import { useRouter } from 'next/router'

function Register({firstLinks, fullname, setFullname, email, setEmail, password, setPassword, errorFullname, errorEmail, errorPassword, errorRegister, setErrorRegister, checkInputs}) {

    useEffect(() => {
        firstLinks()

     });

     const router = useRouter()

     const RegisterSubmit = async (e) => {
        e.preventDefault();
        checkInputs();
        
        const details = {fullname, email, password}
        try {
          const response = await axios.post(`${server}/users/signup`, details);
          setFullname('');
          setEmail('');
          setPassword('');
          setErrorRegister("")
          router.push('/')
          alert('You have succesfully Register')
        } catch (err) {
          console.log(`Error: ${err.message}`);
          setErrorRegister('Registration failed, Please try again');
          
        }
     
      }
   

    return (
        <>
                <Meta title='Register Page'/>
                <div className="container max-w-screen-sm mx-auto">
                    <div className="a my-28 px-9 ">
                            <h1 className=" md:text-4xl font-bold text-2xl mb-12">Create an account</h1>

                    <form className="space-y-7" onSubmit={RegisterSubmit}>
                        <div className="">
                        <label htmlFor="name" className="block mb-2 text-base">Fullname</label>
                        <input type="text" name="name" className="border-2 border-borderColor py-2.5 rounded-lg pl-4 w-full" value={fullname} onChange={(e) => setFullname(e.target.value)}/>
                        {errorFullname && <span className=" text-xs text-red-600">{errorFullname}</span>}
                        </div>
                        <div className="">
                        <label htmlFor="email" className="block mb-2 text-base">Email</label>
                        <input type="email" name="email" className="border-2 border-borderColor py-2.5 rounded-lg pl-4 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errorEmail && <span className=" text-xs text-red-600">{errorEmail}</span>}
                        </div>
                        <div className="">
                        <label htmlFor="password" className="block mb-2 text-base">Password</label>
                        <input type="password" name="password" className="border-2 border-borderColor mb-4 py-2.5 rounded-lg pl-4 w-full" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {errorPassword && <span className=" text-xs text-red-600">{errorPassword}</span>}
                        </div>
                        <button className="bg-btn p-3 mx-auto rounded-lg text-white w-full hover:bg-blue-500 transition ease-in-out duration-300">Create</button>
                        {errorRegister && <span className=" text-xs text-red-600">{errorRegister}</span>}
                    </form>
               </div>
           </div>  
        </>
    )
}

export default Register
