import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function HotelCardItem({hotel}) {

    const [PhotoUrl,setPhotoUrl]=useState();
    
      useEffect(()=>{
        hotel&&GetPlacePhoto();
      },[hotel])
    
      const GetPlacePhoto=async()=>{
        const data={
          textQuery:hotel?.hotelName
        }
        const result=await GetPlaceDetails(data).then(res=>{
          console.log(res.data);
          const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',res.data.places[0].photos[3].name);
          setPhotoUrl(PhotoUrl);
        })
      }

  return (
    <Link to={'https://www.google.com/maps/search/'+hotel?.hotelName+","+hotel?.hotelAddress} target='_blank'>
          <div className='hover:scale-110 transition-all cursor-pointer'>
            <img src={PhotoUrl} alt="image" className="rounded-3xl h-[180px] w-full object-cover " />
            <div className="my-2">
              <h2 className="font-medium mt-1 ">{hotel?.hotelName}</h2>
              <h2 className="text-xs mt-1  text-gray-500">📍 {hotel?.hotelAddress}</h2>
              <h2 className="text-sm mt-1 ">💵 ${hotel?.priceRange}</h2>
              <h2 className="text-sm mt-1 ">⭐ {hotel?.rating}</h2>
            </div>
          </div>
          </Link>
  )
}

export default HotelCardItem