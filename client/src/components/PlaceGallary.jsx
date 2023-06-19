import React, { useState } from 'react'

const PlaceGallary = ({place}) => {
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    if(showAllPhotos){
        return(
         <div className="mt-20 absolute inset-0  text-white bg-black min-h-screen">
             <div className="p-8 bg-black grid gap-4">
                 <div>
                    <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
                    <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                        Close photos
                        </button>
                 </div>
                  {place?.photos?.length>0 && place.photos.map(photo=>(
                     <div>
                         <img className="object-fit min-h-full min-w-full " src={'http://localhost:4000/uploads/'+photo}/>
                     </div>
                 ))}
          </div>
       </div>
     );
     } 

  return (
    <div>
        <div className='relative w-full max-w-7xl '>
             <div className="grid grid-flow-row-dense grid-cols-[2fr_1fr]  gap-2 rounded-3xl overflow-hidden">
                <div>
                    {place.photos?.[0] && (
                    <div>
                        <img onClick={()=>setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cont" src={'http://localhost:4000/uploads/'+place.photos[0]} alt=''/>
                        </div>
                    )}
                </div>

                <div className='grid'>
                {place.photos?.[1] && (
                        <img onClick={()=>setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={'http://localhost:4000/uploads/'+place.photos[1]} alt=''/>
                    )}
                <div className='overflow-hidden'>
                {place.photos?.[2] && (
                        <img onClick={()=>setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover relative top-2" src={'http://localhost:4000/uploads/'+place.photos[2]} alt=''/>
                    )}
                </div>
                </div>
            </div>
            <button onClick={()=>setShowAllPhotos(true)} className='flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-gray-500 hover:text-primary'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="solid" viewBox="-5 0 70 50" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" >
                    <g data-name="Layer 2">
                        <g>
                        <path d="M30,6a6,6,0,1,1-6-6A6,6,0,0,1,30,6ZM24,18a6,6,0,1,0,6,6A6,6,0,0,0,24,18Zm0,18a6,6,0,1,0,6,6A6,6,0,0,0,24,36ZM42,12a6,6,0,1,0-6-6A6,6,0,0,0,42,12Zm0,6a6,6,0,1,0,6,6A6,6,0,0,0,42,18Zm0,18a6,6,0,1,0,6,6A6,6,0,0,0,42,36ZM6,0a6,6,0,1,0,6,6A6,6,0,0,0,6,0ZM6,18a6,6,0,1,0,6,6A6,6,0,0,0,6,18ZM6,36a6,6,0,1,0,6,6A6,6,0,0,0,6,36Z"/>
                        </g>
                    </g>
                </svg>
                Show More
            </button>
        </div>
    </div>
  )
}

export default PlaceGallary