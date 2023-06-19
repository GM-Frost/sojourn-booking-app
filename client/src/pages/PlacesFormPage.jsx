import React,{useState,useEffect} from 'react'
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import axios from "axios";
import AccountNav from './AccountNav';
import { Navigate, useParams } from 'react-router-dom';
    


const PlacesFormPage = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(100);

    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response=>{
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setFeatures(data.features);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
       
        });
    },[id]);

function inputHeader(label){
    return(
        <h2 className="text-2xl mt-4">{label}</h2>
    );
}
function inputDesc(text){
   return(
    <p className="text-gray-500 text-sm">{text}</p>
   );
}

function preInput(header, description){
    return(
        <>
            {inputHeader(header)}
            {inputDesc(description)}
        </>
    );
}

async function saveNewPlace(event){
    event.preventDefault();
    const placeData = {
        title,
        address,
        addedPhotos,
        description,
        features,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
    }
    if(id){
        //Updating  new place
        await axios.put('/places',{
            id,
           ...placeData
        });
        setRedirect(true);

    }else{
        //adding new place
        await axios.post('/places',
          placeData
        );
        setRedirect(true);
    }
   
}

if (redirect) {
    return <Navigate to={'/account/places'}/>;
}

  return (
    <div>
        <AccountNav/>
                <form onSubmit={saveNewPlace}>
                {preInput('Title','title for your place. should be short.')}
                <input type="text" value={title} onChange={ev=>setTitle(ev.target.value)} placeholder="Title ex: My Lovely Apt."/>
                
                {preInput('Address','Address to your place')}
                <input type="text" value={address} onChange={ev=>setAddress(ev.target.value)} placeholder="Address"/>

                {preInput('Photos','more = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/> 

                {preInput('Description','description of the place')}
                <textarea value={description} onChange={ev=>setDescription(ev.target.value)}/>

                {preInput('Perks','select all the perks of your places')}
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <Perks selected={features} onChange={setFeatures}/>
                        </div>
                {preInput('Extra Info','house rules')}
                        <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}/>

                {preInput('Check-In & Check-Out Times, Max Guest, Price','add check-in & check-out times. Remember to have some time for cleaning.')}
                        <div className="grid gap-2 grid-cols-2 sm:grid-cols-2 mdLgrid-cols-4">
                            <div>
                                <h3 className="mt-2 -mb-1">Check-In Time</h3>
                                <input type="text" 
                                    value={checkIn} 
                                    onChange={ev=>setCheckIn(ev.target.value)} 
                                    placeholder="14:00"/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check-Out Time</h3>
                                <input type="text" 
                                    value={checkOut} 
                                    onChange={ev=>setCheckOut(ev.target.value)} 
                                    placeholder="11:59"/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max No. of Guest</h3>
                                <input type="number" 
                                    value={maxGuests} 
                                    onChange={ev=>setMaxGuests(ev.target.value)}/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Price per night $</h3>
                                <input type="number" 
                                    value={price} 
                                    onChange={ev=>setPrice(ev.target.value)}/>
                            </div>
                        </div>
                     
                        
                       
                        <div className="max-w-md mx-auto">
                            <button className="appBtn my-4">
                                Save
                            </button>
                        </div>
                </form>
            </div>
  )
}

export default PlacesFormPage