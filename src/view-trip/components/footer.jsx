import React from 'react'


function Footer({trip}) {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 animate-gradient p-6 rounded-2xl mb-6 mt-5 shadow-md">
  <h2 className="text-xl font-semibold text-white mb-4">Points To Remember During Visit</h2>
  <ul className="list-disc pl-5 text-gray-300">
  {trip?.tripData?.budgetConsiderations?.length ? (
  trip.tripData.budgetConsiderations.map((point, index) => (
    <li key={index}>{point}</li>
  ))
) : (
  <li>No points to display.</li>
)}
  </ul>
</div>



  )
}

export default Footer