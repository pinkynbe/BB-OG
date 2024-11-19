import React, { useState, useEffect } from "react";
import UserService from "../service/UserService";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import {
  UserCircleIcon,
  MailIcon,
  BriefcaseIcon,
  OfficeBuildingIcon,
  PhoneIcon,
  IdentificationIcon,
} from "@heroicons/react/solid";
import { RefreshIcon } from "@heroicons/react/outline";

export default function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState({});
  const { isAdmin } = useAuth();
  const [avatarStyle, setAvatarStyle] = useState("adventurer");
  const avatarStyles = [
    "adventurer",
    "bottts",
    "avataaars",
    "micah",
    "croodles",
    "croodles-neutral",
    "pixel-art",
    "pixel-art-neutral",
    "miniavs",
    "shapes",
    "thumbs",
    "open-peeps",
  ];

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.user);
      if (response.user.avatarStyle) {
        setAvatarStyle(response.user.avatarStyle);
      }
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  const handleAvatarChange = () => {
    const randomIndex = Math.floor(Math.random() * avatarStyles.length);
    setAvatarStyle(avatarStyles[randomIndex]);
  };

  const handleSaveAvatar = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.updateAvatar(
        profileInfo.id,
        token,
        avatarStyle
      );
      setProfileInfo((prevProfile) => ({
        ...prevProfile,
        avatarStyle: response.user.avatarStyle,
      }));
      alert("Avatar updated successfully!");
    } catch (error) {
      console.error("Error saving avatar:", error);
      alert("Failed to update avatar. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Profile Banner */}
      <div className="relative w-full h-48 bg-gradient-to-r from-blue-500 to-teal-400 flex justify-center items-center">
        <div className="absolute bottom-0 transform translate-y-1/2 flex flex-col items-center">
          {/* Avatar */}
          <div className="flex justify-center mb-2 relative">
            <img
              src={`https://api.dicebear.com/6.x/${avatarStyle}/svg?seed=${profileInfo.id}`}
              alt="Profile Avatar"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
            />
            {/* Button to Change Avatar Style */}
            <button
              onClick={handleAvatarChange}
              className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center absolute bottom-0 right-0 transform translate-x-2 translate-y-2 shadow hover:bg-indigo-600"
            >
              <RefreshIcon className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={handleSaveAvatar}
            className="mt-2 px-3 py-1 bg-indigo-500 text-white rounded-md shadow hover:bg-indigo-600"
          >
            Save Avatar
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="bg-white shadow-lg rounded-lg mt-16 w-full max-w-3xl p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            {profileInfo.name}
          </h1>
          <p className="text-gray-500">{profileInfo.role}</p>
        </div>

        {/* Profile Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">PAN</h3>
            <p className="text-gray-600">{profileInfo.pan}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Department</h3>
            <p className="text-gray-600">{profileInfo.department}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Phone</h3>
            <p className="text-gray-600">{profileInfo.mobileNo}</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8" />

        {/* Profile Details */}
        <div className="space-y-6">
          <div className="flex items-center">
            <MailIcon className="h-6 w-6 text-indigo-500 mr-2" />
            <p>{profileInfo.email}</p>
          </div>
          <div className="flex items-center">
            <BriefcaseIcon className="h-6 w-6 text-indigo-500 mr-2" />
            <p>{profileInfo.designation}</p>
          </div>
          <div className="flex items-center">
            <OfficeBuildingIcon className="h-6 w-6 text-indigo-500 mr-2" />
            <p>{profileInfo.department}</p>
          </div>
          <div className="flex items-center">
            <PhoneIcon className="h-6 w-6 text-indigo-500 mr-2" />
            <p>{profileInfo.mobileNo}</p>
          </div>
          <div className="flex items-center">
            <IdentificationIcon className="h-6 w-6 text-indigo-500 mr-2" />
            <p>{profileInfo.pan}</p>
          </div>
        </div>

        {/* Admin Edit Button */}
        {isAdmin && (
          <div className="text-center mt-8">
            <Link
              to={`/update-user/${profileInfo.id}`}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700"
            >
              Update Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
