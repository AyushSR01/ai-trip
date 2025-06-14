import React, { useEffect, useState } from 'react'
import { GrSend } from "react-icons/gr";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';



function InfoSection({trip}) {

  const [photoUrl,setPhotoUrl]=useState();

  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label
    }
    const result=await GetPlaceDetails(data).then(res=>{
      console.log(res.data);
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',res.data.places[0].photos[3].name);
      console.log(PhotoUrl);
      setPhotoUrl(PhotoUrl);
    })
  };     
  return (
    <div>
        <img src={photoUrl} alt="image" className='h-[340px] w-full object-cover rounded-xl' />
        <div className='flex justify-between items-center'>
          <div className='my-5 flex flex-col gap-2'>
            <h2 className='text-xl font-bold'>{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-5'>
              <h2 className='p-1 px-3 bg-gray-500 rounded-full text-white-500 text-base'>📅 {trip.userSelection?.noOfDays} Day</h2>
              <h2 className='p-1 px-3 bg-gray-500 rounded-full text-white-500 text-base'>💸 {trip.userSelection?.budget} Budget</h2>
              <h2 className='p-1 px-3 bg-gray-500 rounded-full text-white-500 text-base'>🧳 No. of Travellers: {trip.userSelection?.Adventurers} </h2>
            </div>
          </div>
          <button className='bg-black h-8 w-8 rounded-full text-amber-50 px-1.5'><GrSend /></button>
        </div>
        
        



    </div>
  )
}

export default InfoSection