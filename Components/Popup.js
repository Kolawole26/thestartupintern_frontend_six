import React from 'react';
import Link from 'next/link';

function Popup({content}) {
  return <>
            <div className="fixed bg-light-black h-screen w-full  top-0 left-0 m-auto flex justify-center align-center z-20 ">
                <div className="relative p-5 my-auto mx-auto h-auto max-h-70 bg-white rounded-lg border-4 border-solid overflow-auto object-center">
                    {content}
                    <Link href='/buckets'><button className='bg-primary py-1 px-3 rounded-lg text-white mt-4 mb-3'>Okay</button></Link>
                    
            </div>
    </div>
         </>;
}

export default Popup;
