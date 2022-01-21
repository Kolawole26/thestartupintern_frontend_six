import React, { useEffect } from 'react'
import Meta from '../Components/Meta'
import axios from 'axios'
import Link from 'next/link'
import { server } from '../config'
import {parseCookies} from '../libs/parseCookies.js'
import Feed from '../Components/Feed'
import Cookies from 'js-cookie'

function Buckets({secondLinks, posts, user, setUser, }) {
  

useEffect(() => {
  secondLinks()
  
});

useEffect(() => {

  const getProfileInfo = async () => {
    const user = Cookies.get('user')
    const info = JSON.parse(user);
    const token = info.token
    const config = {
      headers: {
          Authorization: token
      }
  }
    try {
      const response = await axios.get(`${server}/users/me`, config);
      setUser(response.data.data)
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range 
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
    
  }
  
  getProfileInfo()
  
}, [setUser])
    
    return (
        <>
            <Meta title='My Buckets'/>
            <div className="md:container  md:mx-auto ">
                <div className=" my-24 px-9 max-w-7xl mx-auto">
                    <header className="text-center md:text-left mb-16">
                        <div className="flex md:flex-row md:justify-between flex-col  md:space-y-0 space-y-3 mb-4 md:mb-0">
                          
                        <div >
                        {user.map((userInfo, index ) => {
                           return <h1 className="md:text-4xl font-bold text-2xl mb-3 capitalize" key={index} >Welcome {userInfo.fullname},</h1>
                        } ) }
                        </div>
                        <div>
                        <Link href='/addItem' passHref ><button className="bg-btn p-3 mx-auto md:w-44 w-36 rounded-lg  text-white  hover:bg-blue-500 transition ease-in-out duration-300">Add Item</button></Link>
                        </div>
                        
                        </div>
                        <p className="md:text-xl text-base mb-4">Here are items in your eventful moment bucket.</p>
                    </header>
                        
                        
                            <Feed posts={posts} />
                            
                    
                   
                </div> 
            </div> 
        </>
    )
}

export const getServerSideProps = async (context) => {
    const {req } = context
    const cookies = parseCookies(req)
    const user = cookies.user
    const info = JSON.parse(user);
    const token = info.token
    
  const config = {
    headers: {
        Authorization: `Bearer ${token}`,  
    }
}


  const response = await axios.get(`${server}/moment`, config)
  const posts = await response.data.data

  
    return {
      props: {
        posts,
        
      },
      
    }
  }



export default Buckets
