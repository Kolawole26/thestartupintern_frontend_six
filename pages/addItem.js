import React, { useEffect, useState } from 'react'
import Meta from '../Components/Meta'
import Cookies from 'js-cookie'
import { server } from '../config'
import axios from 'axios'
import { useRouter } from 'next/router'

function AddItem({secondLinks, futureDate, title, details, setFutureDate, setTitle, setDetails, errorSubmit, setErrorSubmit}) {

    const [dateWarn, setDateWarn] = useState(false);

    const router = useRouter()
    
    useEffect(() => {
        secondLinks()
        
      });

    const Datehandle = () => {
        setDateWarn(!dateWarn)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = Cookies.get('user')
       const info = JSON.parse(user);
        const token = info.token;
        const config = {
          headers: {
              Authorization: token
          }
      }
          const detail = {title: title, details: details, futureDate: futureDate}
        try {
          const response = await axios.post(`${server}/moment`, detail, config);
          setFutureDate('');
          setTitle('');
          setDetails('');
          setErrorSubmit('');
          router.push('/buckets');
        } catch (err) {
          console.log(`Error: ${err.message}`);
          setErrorSubmit('failed Please try again. Make sure the Date is a future Date');
        }
      
      }
      

    return (
        <>
        <Meta title='Add Moment'/>
           <div className="container max-w-screen-sm md:mx-12">
               <div className="a my-28 px-9">
               

                    <form className="space-y-7" onSubmit={handleSubmit}>
                        <div className="">
                        <label htmlFor="date" className="block mb-2 text-base">Date in the future</label>
                        {dateWarn ? (<span className=" text-sm  text-yellow-400">Make sure the date is a future date</span>) : (<span></span>)}
                        <input type="date" name="date" className="border-2 border-borderColor py-2.5 rounded-lg pl-4 w-full" value={futureDate} onChange={(e) => setFutureDate(e.target.value)} onClick={Datehandle} />
                        </div>
                        <div className="">
                        <label htmlFor="title" className="block mb-2 text-base">Title</label>
                        <input type="text" name="title" className="border-2 border-borderColor py-2.5 rounded-lg pl-4 w-full" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div className="">
                        <label htmlFor="details" className="block mb-2 text-base">Details</label>
                        <textarea name="details" cols="30" rows="12" className="border-2 border-borderColor py-2.5 rounded-lg pl-4 w-full" value={details} onChange={(e) => setDetails(e.target.value)}></textarea>
                        </div>
                        
                        <button className="bg-btn p-3 mx-auto rounded-lg text-white w-full hover:bg-blue-500 transition ease-in-out duration-300 mb-4">Save</button>
                        {errorSubmit && <span className=" text-xs text-red-600">{errorSubmit}</span>}
                    </form>
               </div>
           </div>   
        </>
    )
}

export default AddItem
