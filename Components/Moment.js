import React from 'react'
import Link from 'next/link';
import dateFormat from "dateformat";

function Moment({post}) {
    return (
        <>
          {post.data.length ? (<div className=" grid md:grid-cols-2 grid-cols-1 gap-5">{post.data.map((data) => { 
               const date = data.futureDate
               return  < div key={data._id}>
                            <div >
                                <div className=" grid shadow-md p-6 rounded hover:bg-yellowBg">
                                    <h5 className=" text-base font-bold mb-4">{data.title}</h5>
                                        <p className="md:text-base text-sm mb-8">
                                            {data.details}
                                        </p>
                                            
                                            <div className="flex flex-col md:flex-row justify-between text-center md:text-left space-y-2 md:space-y-0 mb-3">
                                            <Link href={`/buckets/${data._id}`} passHref className= "text-btn text-sm">View Details</Link>
                                            <div className="flex flex-col md:flex-row md:space-x-11 space-y-2 md:space-y-0">
                                                    <p className="text-ash text-sm">20/05/2021</p>
                                                    <p className="text-sm">{dateFormat(date, "dd/mm/yyyy")}</p>
                                                </div>
                                            </div>
                                </div>
                            </div> 
                        </div>
                })}
                </div>) : (<p> No posts to display.</p>)}  
        </>
    )
}

export default Moment
