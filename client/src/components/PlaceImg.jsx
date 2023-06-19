import React from 'react'

const PlaceImg = ({place, index=0,className=null }) => {
    if(!place.photos?.length){
        return '';
    }
    if(!className){
        className = 'object-cover w-full rounded-2xl rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg';
    }
  return (
    <img  className={className} src={'http://localhost:4000/uploads/'+place.photos[index]} alt=""/>
  )
}

export default PlaceImg