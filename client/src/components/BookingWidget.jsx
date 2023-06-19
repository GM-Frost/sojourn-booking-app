import React, { useContext, useEffect, useState } from 'react'
import {differenceInCalendarDays} from 'date-fns'

import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


import axios from 'axios';

const BookingWidget = ({place}) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [redirect, setRedirect] = useState('');

    //getting booking owner information

    const {user} = useContext(UserContext);

    //update if user is logged in 
    useEffect(()=>{
        if(user){
            setName(user.name);
        }
    },[user])
    let numberOfNights = 0;
    if(checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
    }

    async function bookThisPlace(){
       const response =  await axios.post('/bookings',{
        place:place._id,
            price:numberOfNights*place.price,
            checkIn,
             checkOut,
              numberOfGuests,
               name,
                email,
                 phone
       })

       const bookingID = response.data._id;
       setRedirect(`/account/bookings/${bookingID}`);

    }

    if(redirect){
        return <Navigate to={redirect}/>;
    }
    
  return (
    <div className="max-w-md mx-auto border-gray-300 p-4 rounded-2xl sm:max-w-sm md:max-w-lg">
                <div className='text-2xl text-center'>
                    Price: ${place.price} /per night
                </div>
                <div className='border rounded-2xl mt-4'>
                    <div className="flex">
                        <div className='py-3 px-4 '>
                            <label>Check In: </label>
                            <input type="date" value={checkIn} onChange={event => setCheckIn(event.target.value)}/>
                        </div>
                        <div className='py-3 px-4 border-l'>
                            <label>Check Out: </label>
                            <input type="date" value={checkOut} onChange={event => setCheckOut(event.target.value)}/>
                        </div>
                    </div>
                    <div className='py-3 px-4 border-t'>
                        <label>Number of Guest: </label>
                        <input type="number" value={numberOfGuests} onChange={event => setNumberOfGuests(event.target.value)}/>
                    </div>
                    {numberOfNights>0 && (
                        <div className='py-3 px-4 border-t'>
                           <div className='mt-1 mb-3 text-center text-secondary'><label>(Total Stay: {numberOfNights} Nights) </label></div>
                            <label>Your Full Name</label>
                            <input type="text" value={name} onChange={event => setName(event.target.value)} placeholder='John Doe'/>
                            <label>Email</label>
                            <input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder='yourname@email.com'/>
                            <label>Phone</label>
                            <input type="tel" value={phone} onChange={event => setPhone(event.target.value)} placeholder='(444)-444-4444'/>
                           
                        </div>
                    )}
                </div>
                <div>
                </div>
                <button className="mt-4 appBtn" onClick={bookThisPlace}>Book this place for&nbsp;
                    {numberOfNights > 0 && (
                        <>
                            <span>${numberOfNights * place.price}</span>
                        </>
                    )}
                </button>
    </div>
    
  )
}

export default BookingWidget