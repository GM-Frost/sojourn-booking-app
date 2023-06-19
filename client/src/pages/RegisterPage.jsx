import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 async function registerUser(event){
    event.preventDefault();
    try {
      await axios.post('/register',{
        name,
        email,
        password,
      });
      alert('Registration Successful. Now you can log in');
    } catch (error) {
      alert('Registration Failed. Please try again later');
    }
   

    
  }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
          <div className='mt-32'>
            <h1 className='text-4xl text-center mb-4'>Register.</h1>
            <form className='max-w-md mx-auto' onSubmit={registerUser}>

              <input type="text" placeholder='John Doe' value={name} onChange={event=>setName(event.target.value)}/>
              <input type="text" placeholder='your@email.com' value={email} onChange={event=>setEmail(event.target.value)}/>
              <input type="password" placeholder='password' value={password} onChange={event=>setPassword(event.target.value)}/>
    
              <button className='appBtn'>Register</button>
              <div className='text-center py-2 text-gray-500'>
                <p>Already a member? <Link to={'/login'} className='underline text-primary'>Login Here</Link></p>
              </div>
            </form>
          </div>
        </div>
      )
}

export default RegisterPage