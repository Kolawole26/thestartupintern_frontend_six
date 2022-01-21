import React, { useEffect } from 'react'
import Meta from '../../../Components/Meta'
import axios from 'axios'
import { server } from '../../../config'
import {parseCookies} from '../../../libs/parseCookies.js'
import dateFormat from 'dateformat'
import Link from 'next/link';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

function SingleMomment({secondLinks, post}) {

  useEffect(() => {
    secondLinks()
    
  });

  const router = useRouter()
  
  const handleDelete = async (id) => {
    const user = Cookies.get('user')
    const info = JSON.parse(user);
    const token = info.token
    const config = {
      headers: {
          Authorization: token
      }
  }
    try {
      await axios.delete(`${server}/moment/${id}`, config);
      router.push('/buckets');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  
  const date = post.futureDate
  
    return (
        <>
            <Meta title='Single Bucket'/>
           <div className="md:container  md:mx-auto md:min-h-screen" >
                <div className=" my-24 px-9 max-w-7xl mx-auto">
                    <header className=" mb-11">
                        <h1 className="md:text-4xl font-bold text-2xl mb-4">{post.title}</h1>
                        <p className="text-btn text-sm">{dateFormat(date, "dd/mm/yyyy")}</p> 
                    </header>
                    <section>
                        <div className="space-y-7 mb-20 md:text-justify">
                            <p className="md:text-base text-sm">
                                {post.details}
                            </p>
                            
                        </div>
                        <div className="flex md:flex-row flex-col md:space-x-3 space-x-0 md:space-y-0 space-y-3 ">
                            <Link href={`/editItem/${post._id}`} passHref><button className="bg-cyan p-3  md:w-44 w-full rounded-lg text-white  hover:bg-green-600 transition ease-in-out duration-300">Edit</button></Link>
                            <button className="bg-danger p-3 mx-auto rounded-lg text-white md:w-44 w-full hover:bg-red-700 transition ease-in-out duration-300" onClick={() => handleDelete(post._id)}>Delete</button>
                        </div>
                    </section>
                </div>
           </div>
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


export default SingleMomment
