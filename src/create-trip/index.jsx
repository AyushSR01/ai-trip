import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelaList } from '../constants/options';
import { chatSession } from '../service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { VscLoading } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 10 || !formData?.location || !formData?.Budget || !formData?.Adventurers) {
      alert("Enter a valid number of days (less than 10) or fill all required fields.");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.Adventurers)
      .replace('{budget}', formData?.Budget);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const Login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log("Login Error:", error)
  });

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/' + docId);
  };

  const getUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json'
        }
      })
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      })
      .catch((error) => console.error("Error fetching user profile:", error));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="h-fit bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-gray-800 px-5 sm:px-10 md:px-20 lg:px-40 xl:px-60 py-12 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">Tell Us Your Travel Preference</h1>
      <p className="text-lg md:text-xl text-center text-gray-500 mb-12 max-w-2xl">
        Just provide some basic information, and our planner will generate a customized itinerary based on your preferences.
      </p>

      <div className="w-full bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-10">
        <div>
          <h2 className='text-xl mb-3 font-medium'>What is your desirable destination?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v);
              }
            }}
          />
        </div>

        <div>
          <h2 className='text-xl mb-3 font-medium'>How many days are you planning for the trip?</h2>
          <input
            className='w-full h-10 px-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
            placeholder="e.g., 3"
            type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className='text-xl mb-3 font-medium'>How much can you spend?</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {SelectBudgetOptions.map((item, idx) => (
              <div key={idx} onClick={() => handleInputChange('Budget', item.title)}
                className={`cursor-pointer p-5 border rounded-xl hover:shadow-xl transition-all duration-300 flex gap-6 items-center ${formData?.Budget === item.title ? 'shadow-lg border-blue-500 text-blue-600' : ''}`}>
                <div className='text-3xl'>{item.icon}</div>
                <div>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <p className='text-sm text-gray-500'>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl mb-3 font-medium'>Who do you plan to travel with?</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {SelectTravelaList.map((item, idx) => (
              <div key={idx} onClick={() => handleInputChange('Adventurers', item.people)}
                className={`cursor-pointer p-5 border rounded-xl hover:shadow-xl transition-all duration-300 flex gap-6 items-center ${formData?.Adventurers === item.people ? 'shadow-lg border-blue-500 text-blue-600' : ''}`}>
                <div className='text-3xl'>{item.icon}</div>
                <div>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <p className='text-sm text-gray-500'>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex justify-end'>
          <button
            onClick={OnGenerateTrip}
            disabled={loading}
            className="relative inline-block px-6 py-3 font-semibold text-white bg-black rounded-xl overflow-hidden shadow group transition-all duration-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition duration-500 ease-out z-0"></span>
            <span className="absolute -left-full top-0 w-full h-full bg-white opacity-20 transform skew-x-12 group-hover:animate-shine z-0"></span>
            <span className="relative z-10 flex items-center justify-center">
              {loading ? <VscLoading className="h-7 w-7 animate-spin duration-100" /> : <span className="text-xl">Generate Trip Plan</span>}
            </span>
          </button>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-xl text-center">
              {/* Close Button */}
              <button
                onClick={() => setOpenDialog(false)}  // Close dialog on close button click
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
      
              {/* Logo */}
              <DialogDescription className="flex justify-center">
                <img src="/logo.svg" alt="logo" className="h-14" />
              </DialogDescription>
      
              {/* Content */}
              <p className="text-gray-700 mb-4">Sign in with Google for a seamless experience.</p>
      
              {/* Google Login Button */}
              <button
                onClick={Login}  // Call the Login function
                className="flex items-center gap-3 px-4 py-2 border rounded-lg shadow hover:shadow-lg"
              >
                <FcGoogle className="text-2xl" />
                <span className="text-gray-700 font-medium">Sign in with Google</span>
              </button>
            </DialogContent>
          </Dialog>
    </div>
  );
}

export default CreateTrip;
