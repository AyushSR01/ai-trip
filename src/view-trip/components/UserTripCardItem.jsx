import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function UserTripCardItem({ trip }) {

    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name)

            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)

            setPhotoUrl(photoUrl)

        })
    }

    return (
        <Link to={'/view-trip/' + trip?.id}>
            <div className='hover:scale-105 transition-all duration-300 ease-in-out'>
                {/* Image with Inverse Color on Hover */}
                <img 
                    src={photoUrl ? photoUrl : 'https://aitrip.tubeguruji.com/placeholder.jpg'}  
                    className='rounded-xl h-[180px] w-full object-cover transition-all duration-300 ease-in-out transform group-hover:invert' 
                    style={{
                        transition: 'all 0.3s ease-in-out', 
                        filter: 'invert(0)',
                    }}
                />
                <div>
                    <h2 className='font-bold text-lg text-white'>{trip?.userSelection?.location?.label}</h2>
                    <div>
                        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Day with {trip?.userSelection?.Budget} Budget </h2>
                    </div>
                </div>
            </div>
        </Link>
    );
}
