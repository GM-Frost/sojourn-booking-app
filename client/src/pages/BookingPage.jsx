import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import AddressLink from '../components/AddressLink';
import PlaceGallary from '../components/PlaceGallary';
import BookingDates from '../components/BookingDates';

const BookingPage = () => {
  const {id} = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(()=>{
    if(id){
      axios.get('/bookings').then(response=>{
        const foundBooking = response.data.find(({_id})=> _id === id)
        if(foundBooking){
          setBooking(foundBooking);
        }
      })
    }
  });

  if(!booking){
    return '';
  }
  return (
    <div className='my-8'>
      <h2 className="text-3xl">Photos of {booking.place.title}</h2>
      <AddressLink className='my-2 block'>{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className='text-2xl mb-4'>Your Booking Information:</h2>
          <BookingDates booking={booking}/>
        </div>
        <div className='bg-primary p-6 text-white rounded-3xl'>
          <div className=''>Total Price</div>
          <div className='text-center text-3xl'>${booking.price}</div>
        </div>
      </div>
      <PlaceGallary place={booking.place}/>
    </div>
  )
}

export default BookingPage