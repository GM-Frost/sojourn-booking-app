
import { Link} from "react-router-dom"
import AccountNav from "./AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(()=>{
    axios.get('/user-places').then(({data})=>{
        setPlaces(data);
    })
  },[])

  return (
    <div>
        <AccountNav/>

        <div className="text-center">
          
          <br/>
            <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full " to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
                Add New Place
            </Link>
        </div>
        <div className="mt-4">
          {places.length>0 && places.map(place=>(
            <Link to={'/account/places/'+place._id} key={place} className="flex flex-col mt-5 items-center cursor-pointer gap-4  bg-white p-2 border border-gray-200 rounded-lg shadow-lg md:flex-row md:max-w-100% hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="flex rounded-2xl w-100% h-100%  bg-gray-300 grow shrink-0">
                <PlaceImg place={place}/>
              </div>
              <div className="flex flex-col justify-between p-4 leading-normal grow-0 shrink">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-primary dark:text-white">{place.title}</h2>
                <p className="mb-3 font-normal text-gray-700 dark:text-white text-sm mt-2 ">{place.description}</p>
              </div>
            </Link>

       
          ))}
        </div>
    </div>
  )
}

export default PlacesPage