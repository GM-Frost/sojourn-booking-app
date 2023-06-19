import React, { useEffect, useState } from 'react'
import AccountNav from './AccountNav';
import axios from 'axios';
import PlaceImg from '../components/PlaceImg';

import { Link } from 'react-router-dom';
import BookingDates from '../components/BookingDates';
const BookingsPage = () => {

    const [bookings, setBookings] = useState([]);

    useEffect(()=>{
        axios.get('/bookings').then(response =>{
            setBookings(response.data);
        })
    },[])

  return (
    <div>
        <AccountNav/>
        <div>
            {bookings?.length>0 && bookings.map(booking=>(
                <Link to={`/account/bookings/${booking._id}`} className='flex gap-4 mt-8 mb-8 rounded-xl bg-white border border-gray-200  shadow-lg'>
                    <div className="w-40 h-auto">
                        <PlaceImg className="h-40 object-fill rounded-tl-xl rounded-bl-xl" place={booking.place}/>
                    </div>
                    <div className='py-3 grow pr-3 text-sm '>
                        <h2 className='text-xl text-primary'>{booking.place.title} </h2>
                           <BookingDates booking={booking} className='items-center border-t border-gray-300 py-2'/>
                        <div className='text-lg '>

                         <div className="flex gap-1 text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                </svg>
                                Total Price : <span className='text-green-500'>${booking.price}</span>
                            </div>
                        </div>
                    </div>
                    
                </Link>
            ))}
        </div>
    </div>
  )
}

export default BookingsPage