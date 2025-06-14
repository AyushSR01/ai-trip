import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link  } from 'react-router-dom'

function PlaceCardItem({place}) {
  const [PhotoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);
  
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName,
    };
  
    try {
      const res = await GetPlaceDetails(data);
      console.log(res.data);
      
      const photoUrl = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[3].name);
      setPhotoUrl(photoUrl); // lowercase variable used for clarity
    } catch (error) {
      console.error("Error getting place photo:", error);
    }
  };
  

  return (
    <Link to={'https://www.google.com/maps/search/'+place.placeName} target='_blank'>
      <div className='border rounded-xl p-3 mt-2 flex gap-5 bg-gradient-to-r from-indigo-200 via-pink-200 to-yellow-200 bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500 hover:shadow-xl transform hover:scale-[1.01] text-gray-800 items-center font-semibold'>

<img src={PhotoUrl?PhotoUrl:"/OIP.jpeg"} alt="" className='w-[140px] h-[140px] rounded-xl object-cover transition-transform duration-500 hover:scale-105' />
<div>
  <h2 className='font-bold text-lg italic text-gray-800'>{place.placeName}</h2>
  <p className='text-sm text-gray-600 mt-1'>{place.placeDetails}</p>
  <h2 className='text-sm text-red-500 mt-2'>{place.timeToTravel}</h2>
  
</div>

</div>
  </Link>
    

  )
}

export default PlaceCardItem