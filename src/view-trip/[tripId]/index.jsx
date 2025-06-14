import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/footer';

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
  const [scrollingUp, setScrollingUp] = useState(false); // Check if scrolling up
  const [refreshing, setRefreshing] = useState(false); // Track refreshing status
  const [showTagline, setShowTagline] = useState(false); // Track if refreshing tagline should be visible

  // Fetch trip data from Firebase
  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  // Get trip data from Firestore
  const GetTripData = async () => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTrip(docSnap.data());
    } else {
      alert("No such document exists");
    }
  };

  // Handle scroll event to detect scroll direction
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY) {
      setScrollingUp(true);
    } else {
      setScrollingUp(false);
    }

    setLastScrollY(currentScrollY);
  };

  // Smoothly scroll to the top
  const smoothScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // Smooth scroll behavior
    });
  };

  // Refresh the page with smooth scroll if user scrolls up to the top
  const handleRefresh = () => {
    if (scrollingUp && window.scrollY === 0) {
      setRefreshing(true);
      setShowTagline(true); // Show the refreshing tagline
      smoothScrollToTop();
      setTimeout(() => {
        window.location.reload(); // Refresh the page after smooth scroll
      }, 500); // Delay to allow smooth scrolling animation to complete
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    if (scrollingUp && window.scrollY === 0 && !refreshing) {
      handleRefresh(); // Refresh when user scrolls to the top
    }

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, scrollingUp, refreshing]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 px-6 py-10 md:px-20 lg:px-36 xl:px-56">
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 space-y-10">
        {/* Show the refreshing tagline if refreshing is true */}
        {showTagline && (
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 p-4 bg-gray-800 text-white rounded-xl shadow-lg opacity-80">
            <span className="text-xl">Refreshing your trip...</span>
          </div>
        )}

        <InfoSection trip={trip} />
        <Hotels trip={trip} />
        <PlacesToVisit trip={trip} />
        <Footer trip={trip} />
      </div>
    </div>
  );
}

export default Viewtrip;
