import React,{useState, useContext} from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [redirect, setRedirect] = useState(false);


  const {setUser} = useContext(UserContext);

  async function handleLoginSubmit(event){
    event.preventDefault();

    try {
      const {data} = await axios.post('/login',{email,password}); 
      setUser(data);
      setRedirect(true);
      
    } catch (error) {
      alert('Login failed')
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mt-32'>
        <h1 className='text-4xl text-center mb-4'>Login.</h1>
        <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>

          <input type="text" placeholder='your@email.com' value={email} onChange={(event)=> setEmail(event.target.value)}/>
          <input type="password" placeholder='password' value={password} onChange={(event)=> setPassword(event.target.value)}/>

          <button className='appBtn'>Login</button>
          <div className='text-center py-2 text-gray-500'>
            <p>Don't have an account yet? <Link to={'/register'} className='underline text-primary'>Register Now</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage