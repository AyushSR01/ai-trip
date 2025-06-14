import React, { useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { redirect } from 'react-router-dom';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const Login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log("Login Error:", error)
  });

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
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  return (
    <header className="relative bg-gradient-to-l from-red-900 via-black to-red-900 p-4 shadow-md transition-all duration-500 group hover:bg-transparent">
      {/* Shine effect on hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition duration-500 ease-out z-0"></span>
      <span className="absolute -left-full top-0 w-full h-full bg-white opacity-20 transform skew-x-12 group-hover:animate-shine z-0"></span>

      <div className="max-w-screen-xl ml-0 flex justify-between items-center px-5 text-white z-10">
        <img
          src="/logo.svg"
          alt="Logo"
          className='z-10 '
        />
        

        <div className="relative z-10">
          {user ? (
            <div className="flex items-center gap-4">
              <a href="/my-trips">
  <button className="relative overflow-hidden bg-white text-blue-700 font-semibold py-2 px-4 rounded-xl shadow transition-all duration-300 group">
    <span className="absolute inset-0 bg-red-700 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 z-0 rounded-xl"></span>
    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
      MyTrips
    </span>
  </button>
</a>


              <Popover>
                <PopoverTrigger className="w-[50px]">
                  <img src={user?.picture} className="h-[50px] w-[50px] rounded-full border-2 border-white" alt="user" />
                </PopoverTrigger>
                <PopoverContent className="bg-white text-black p-3 rounded shadow w-40 text-center">
                  <button
                    className="text-red-500 font-medium hover:underline"
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Log Out
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <button
  onClick={() => setOpenDialog(true)}
  className="relative overflow-hidden w-25 ml-25 bg-white text-blue-700 font-semibold py-2 px-4 rounded-xl shadow transition-all duration-300 group"
>
  <span className="absolute inset-0 bg-blue-700 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 z-0 rounded-xl"></span>
  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
    Login / Sign Up
  </span>
</button>



          )}
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
    </header>
  );
}

export default Header;
