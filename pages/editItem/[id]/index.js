import React, { useEffect, useState } from 'react'
import Meta from '../../../Components/Meta'
import axios from 'axios'
import { server } from '../../../config'
import {parseCookies} from '../../../libs/parseCookies.js'
import dateFormat from "dateformat";
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

function EditItem({secondLinks, post, errorSubmit, setErrorSubmit
}) {
    
    const [editTitle, setEditTitle] = useState("");
    const [editDetails, setEditDetails] = useState("");
    const [editFutureDate, setEditFutureDate] = useState("");
    const [dateWarn, setDateWarn] = useState(false);

    useEffect(() => {
      secondLinks()
      
    });

     const Datehandler = () => {
        setDateWarn(!dateWarn)
    }

    const router = useRouter()

    const date = post.futureDate;
    const myDate = dateFormat(date, "isoDate");
    
    
    
    useEffect(() => {
    
            setEditTitle(post.title);
            setEditDetails(post.details);
            setEditFutureDate(myDate);
      
    }, [myDate, post.title, post.details]);

    const handleEdit = async (id) => {
 
        const updatedMoment = {title: editTitle, details: editDetails, futureDate: editFutureDate };
        const user = Cookies.get('user')
        const info = JSON.parse(user);
        const token = info.token
        const config = {
          headers: {
              Authorization: token
          }
      }
        try {
          const response = await axios.patch(`${server}/moment/${id}`, updatedMoment, config);
          setEditTitle('');
          setEditDetails('');
          setEditFutureDate('');
          setErrorSubmit('')
          router.push('/buckets');
        } catch (err) {
          console.log(`Error: ${err.message}`);
          setErrorSubmit('failed Please try again. Make sure the Date is a future Date');
        }
      }
      
      

    return (
        <>
        <Meta title='Edit Moment'/>
          {editTitle && 
                <div className="container max-w-screen-sm md:px-12" >
               <div className=" my-28 px-9 " >
               

               <form className="space-y-7" onSubmit={(e) => e.preventDefault()} >
                        <div className="" >
                        <label htmlFor="date" className="block mb-2 text-base">Date in the future</label>
                        {dateWarn ? (<span className=" text-sm  text-yellow-400">Make sure the date is a future date</span>) : (<span></span>)}
                        <input type="date" name="date" className="border-2 border-borderColor py-2.5 rounded-lg pl-4 w-full" value={editFutureDate} onChange={(e) => setEditFutureDate(e.target.value)} onClick={Datehandler}  />
                        </div>
                        <div className="">
                        <label htmlFor="title" className="block mb-2 text-base">Title</label>
                        <input type="text" name="title" className="border-2 border-borderColor py-2.5 rounded-lg pl-4 w-full" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}/>
                        </div>
                        <div className="">
                        <label htmlFor="details" className="block mb-2 text-base">Details</label>
                        <textarea name="details" cols="30" rows="12" className="border-2 border-borderColor py-2.5 rounded-lg pl-4 w-full" value={editDetails} onChange={(e) => setEditDetails(e.target.value)}></textarea>
                        </div>
                        
                        <button className="bg-btn p-3 mx-auto rounded-lg text-white w-full hover:bg-blue-500 transition ease-in-out duration-300 mb-4" onClick={() => handleEdit(post._id)}>Update</button>
                        {errorSubmit && <span className=" text-xs text-red-600">{errorSubmit}</span>}
                    </form>
               </div>
           </div>     }
        </>
    )
}

export const getServerSideProps = async (context) => {
    const {req } = context
    const cookies = parseCookies(req);
    const user = cookies.user
    const info = JSON.parse(user);
    const token = info.token
    
  const config = {
    headers: {
        Authorization: `Bearer ${token}`,  
    }
  }
  
  const response = await axios.get(`${server}/moment/${context.params.id}`, config)
  const post = await response.data.data
    
    
    return {
      props: {
        post,
        
      },
      
    }
  }
  

export default EditItem
