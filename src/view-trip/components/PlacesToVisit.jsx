import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className="font-bold text-xl mt-5">Places To Visit</h2>
        <div>

        {Object.entries(trip?.tripData?.itinerary || {}).sort(([dayA], [dayB]) => {
            const numA = parseInt(dayA.replace("day", ""));
            const numB = parseInt(dayB.replace("day", ""));
            return numA - numB;
        }).map(([day, data], dayIndex) => (
        <div key={dayIndex}>
            <h2 className='font-bold text-lg'>Day {day.replace("day", "")}</h2>
            <div className='grid grid-cols-2 gap-3'>
                {data.activities.map((place, index) => (
                    <div key={index} className='my-3'>
                        <h2 className='font-medium text-sm text-orange-600'>{place.bestTimeToVisit}</h2>
                        <PlaceCardItem place={place} />
                    </div>
                ))}
            </div>
        </div>
        ))}


            
        </div>
    </div>
  )
}

export default PlacesToVisit