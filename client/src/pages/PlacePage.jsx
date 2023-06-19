import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from '../components/BookingWidget';
import PlaceGallary from '../components/PlaceGallary';
import AddressLink from '../components/AddressLink';

const PlacePage = () => {
    const {id} = useParams();
    const [place, setPlace] = useState(null);

    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get(`/places/${id}`).then(response=>{
            setPlace(response.data);
        });
    },[id]);

    if(!place) return '';

  return (
    <div className='mt-4 bg-gray-50 -mx-8 px-8 py-8'>
       <h1 className='text-3xl'>{place.title}</h1>
        <AddressLink>{place.address}</AddressLink>
        <PlaceGallary place={place}/>
        <div className='mt-8 mb-8 gap-8 grid grid-cols-[2fr_1fr] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div>
                    <div>
                        <h2 className='font-semibold text-2xl'>Description</h2>
                        {place.description}
                    </div>
                <div className='mt-3'>
                Check-in:&nbsp;{place.checkIn}<br/>
                Check-Out:&nbsp;{place.checkOut}<br/>
                Max-Guest:&nbsp;{place.maxGuests}<br/>
                   
                </div>
           </div>
           <div>
            <BookingWidget place={place}/>
           </div>
        
        </div>
        <div className='mt-1 border-t -mx-8 px-8 py-8 bg-white'>
                <h2 className='font-semibold text-2xl'>Extra Info</h2>
                <div className='mt-2 text-sm text-gray-700 leading-5'>{place.extraInfo}</div>
            </div>
     
    </div>
  )
}

export default PlacePage