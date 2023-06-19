import React,{ useContext,useState  } from 'react';
import {UserContext} from '../context/UserContext';
import { Navigate, useParams } from 'react-router-dom';

import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from './AccountNav';

const ProfilePage = () => {
    const {ready, user, setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    let {subpage} = useParams();

    
        //logout funtion
       async function logout(){
            await axios.post('/logout');
            setRedirect('/');
            setUser(null);
        }


    if (subpage === undefined){
        subpage = 'profile';
    }

    if(!ready){
        return 'Loading...';
    }
    if(ready && !user && !redirect){
        return <Navigate to={'/login'}/>
    }

    
    if(redirect){
        return <Navigate to={redirect}/>
    }
    //subpages



  return (
    <div>
        <AccountNav/>
        {subpage === 'profile' && (
            <div className='text-center max-w-lg mx-auto'>
                Logged in as {user.name} ({user.email})
                <button onClick={logout} className='mt-3 bg-transparent text-secondary p-2 w-full border border-secondary hover:border-secondary  group relative max-w-sm  overflow-hidden rounded-lg text-lg shadow-lg'>
                    <div className="absolute inset-0 w-0 bg-secondary transition-all duration-[250ms] ease-out group-hover:w-full "></div>
                    <span className="relative text-secondary  group-hover:text-white">
                        Log out 
                    </span>
                </button>
            </div>
        )}
        {subpage === 'places' && (
            <div>
                <PlacesPage/>
            </div>
        )}
    </div>
  )
}

export default ProfilePage