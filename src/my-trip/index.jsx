import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from '@/view-trip/components/UserTripCardItem'

export default function MyTrips() {
  const navigate = useNavigate()
  const [userTrips, setUserTrips] = useState([])

  useEffect(() => {
    GetUserTrips()
  }, [])

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/')
      return
    }

    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email))
    const querySnapshot = await getDocs(q)
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data())
      setUserTrips(prevVal => [...prevVal, doc.data()])
    })
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-0.5 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900">
      <h1 className='font-bold text-4xl p-5 text-white'>My Trips</h1>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-7 mt-3 '>
        {userTrips?.length > 0 ? userTrips.map((trip, index) => (
          <div 
            key={index} 
            className="relative hover:scale-105 transform hover:bg-black transition-all duration-300 ease-in-out rounded-xl"
          >
            <UserTripCardItem trip={trip} />
          </div>
        ))
          :
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div 
              key={index} 
              className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'
            >
            </div>
          ))
        }
      </div>
    </div>
  )
}

