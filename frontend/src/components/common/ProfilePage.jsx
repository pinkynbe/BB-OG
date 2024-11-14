// // // // // import React, { useState, useEffect } from "react";
// // // // // import UserService from "../service/UserService";
// // // // // import { Link } from "react-router-dom";
// // // // // import { useAuth } from "../../AuthContext";
// // // // // import "../../style.css";

// // // // // export default function ProfilePage() {
// // // // //   const [profileInfo, setProfileInfo] = useState({});
// // // // //   const { isAdmin } = useAuth();

// // // // //   useEffect(() => {
// // // // //     fetchProfileInfo();
// // // // //   }, []);

// // // // //   const fetchProfileInfo = async () => {
// // // // //     try {
// // // // //       const token = localStorage.getItem("token");
// // // // //       const response = await UserService.getYourProfile(token);
// // // // //       setProfileInfo(response.user);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching profile information:", error);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="profile-container">
// // // // //       <div className="profile-card">
// // // // //         <img
// // // // //           src="https://via.placeholder.com/100"
// // // // //           alt="Profile"
// // // // //           className="profile-image"
// // // // //         />
// // // // //         {/* <h2>Profile Information</h2> */}
// // // // //         <h2>{profileInfo.name}</h2>
// // // // //         <p>Email: {profileInfo.email}</p>
// // // // //         <p>Designation: {profileInfo.designation}</p>
// // // // //         <p>Department: {profileInfo.department}</p>
// // // // //         <p>Mobile No: {profileInfo.mobileNo}</p>
// // // // //         <p>Pan No: {profileInfo.pan}</p>
// // // // //         {isAdmin && (
// // // // //           <button>
// // // // //             <Link to={`/update-user/${profileInfo.id}`}>
// // // // //               Update This Profile
// // // // //             </Link>
// // // // //           </button>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // import React, { useState, useEffect } from "react";
// // // // import UserService from "../service/UserService";
// // // // import { Link } from "react-router-dom";
// // // // import { useAuth } from "../../AuthContext";
// // // // import {
// // // //   UserCircleIcon,
// // // //   MailIcon,
// // // //   BriefcaseIcon,
// // // //   OfficeBuildingIcon,
// // // //   PhoneIcon,
// // // //   IdentificationIcon,
// // // // } from "@heroicons/react/solid";

// // // // export default function ProfilePage() {
// // // //   const [profileInfo, setProfileInfo] = useState({});
// // // //   const { isAdmin } = useAuth();

// // // //   useEffect(() => {
// // // //     fetchProfileInfo();
// // // //   }, []);

// // // //   const fetchProfileInfo = async () => {
// // // //     try {
// // // //       const token = localStorage.getItem("token");
// // // //       const response = await UserService.getYourProfile(token);
// // // //       setProfileInfo(response.user);
// // // //     } catch (error) {
// // // //       console.error("Error fetching profile information:", error);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
// // // //       <div className="relative py-3 sm:max-w-xl sm:mx-auto">
// // // //         <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
// // // //         <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
// // // //           <div className="max-w-md mx-auto">
// // // //             <div className="flex items-center space-x-5">
// // // //               <div className="h-14 w-14 bg-indigo-500 rounded-full flex items-center justify-center">
// // // //                 <UserCircleIcon className="h-8 w-8 text-white" />
// // // //               </div>
// // // //               <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
// // // //                 <h2 className="leading-relaxed">{profileInfo.name}</h2>
// // // //                 <p className="text-sm text-gray-500 font-normal leading-relaxed">
// // // //                   {profileInfo.role}
// // // //                 </p>
// // // //               </div>
// // // //             </div>
// // // //             <div className="divide-y divide-gray-200">
// // // //               <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
// // // //                 <div className="flex items-center">
// // // //                   <MailIcon className="h-6 w-6 text-indigo-500 mr-2" />
// // // //                   <p>{profileInfo.email}</p>
// // // //                 </div>
// // // //                 <div className="flex items-center">
// // // //                   <BriefcaseIcon className="h-6 w-6 text-indigo-500 mr-2" />
// // // //                   <p>{profileInfo.designation}</p>
// // // //                 </div>
// // // //                 <div className="flex items-center">
// // // //                   <OfficeBuildingIcon className="h-6 w-6 text-indigo-500 mr-2" />
// // // //                   <p>{profileInfo.department}</p>
// // // //                 </div>
// // // //                 <div className="flex items-center">
// // // //                   <PhoneIcon className="h-6 w-6 text-indigo-500 mr-2" />
// // // //                   <p>{profileInfo.mobileNo}</p>
// // // //                 </div>
// // // //                 <div className="flex items-center">
// // // //                   <IdentificationIcon className="h-6 w-6 text-indigo-500 mr-2" />
// // // //                   <p>{profileInfo.pan}</p>
// // // //                 </div>
// // // //               </div>
// // // //               {isAdmin && (
// // // //                 <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
// // // //                   <Link
// // // //                     to={`/update-user/${profileInfo.id}`}
// // // //                     className="text-indigo-600 hover:text-indigo-900"
// // // //                   >
// // // //                     Update This Profile &rarr;
// // // //                   </Link>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import React, { useState, useEffect } from "react";
// // // import UserService from "../service/UserService";
// // // import { Link } from "react-router-dom";
// // // import { useAuth } from "../../AuthContext";
// // // import {
// // //   UserCircleIcon,
// // //   MailIcon,
// // //   BriefcaseIcon,
// // //   OfficeBuildingIcon,
// // //   PhoneIcon,
// // //   IdentificationIcon,
// // // } from "@heroicons/react/solid";

// // // export default function ProfilePage() {
// // //   const [profileInfo, setProfileInfo] = useState({});
// // //   const { isAdmin } = useAuth();

// // //   useEffect(() => {
// // //     fetchProfileInfo();
// // //   }, []);

// // //   const fetchProfileInfo = async () => {
// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       const response = await UserService.getYourProfile(token);
// // //       setProfileInfo(response.user);
// // //     } catch (error) {
// // //       console.error("Error fetching profile information:", error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-100 flex flex-col items-center ">
// // //       {/* Profile Banner */}
// // //       <div className="relative w-full h-48 bg-gradient-to-r from-blue-500 to-teal-400 flex justify-center items-center">
// // //         <div className="absolute bottom-0 transform translate-y-1/2">
// // //           <img
// // //             src="https://via.placeholder.com/120"
// // //             alt="Profile Avatar"
// // //             className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* Profile Content */}
// // //       <div className="bg-white shadow-lg rounded-lg mt-16 w-full max-w-3xl p-6">
// // //         <div className="text-center">
// // //           <h1 className="text-2xl font-semibold text-gray-800">
// // //             {profileInfo.name}
// // //           </h1>
// // //           <p className="text-gray-500">{profileInfo.role}</p>
// // //         </div>

// // //         {/* Profile Stats */}
// // //         <div className="mt-8 grid grid-cols-3 gap-4 text-center">
// // //           <div>
// // //             <h3 className="text-lg font-semibold text-gray-700">PAN</h3>
// // //             <p className="text-gray-600">{profileInfo.pan}</p>
// // //           </div>
// // //           <div>
// // //             <h3 className="text-lg font-semibold text-gray-700">Department</h3>
// // //             <p className="text-gray-600">{profileInfo.department}</p>
// // //           </div>
// // //           <div>
// // //             <h3 className="text-lg font-semibold text-gray-700">Phone</h3>
// // //             <p className="text-gray-600">{profileInfo.mobileNo}</p>
// // //           </div>
// // //         </div>

// // //         {/* Divider */}
// // //         <hr className="my-8" />

// // //         {/* Profile Details */}
// // //         <div className="space-y-6">
// // //           <div className="flex items-center">
// // //             <MailIcon className="h-6 w-6 text-indigo-500 mr-2" />
// // //             <p>{profileInfo.email}</p>
// // //           </div>
// // //           <div className="flex items-center">
// // //             <BriefcaseIcon className="h-6 w-6 text-indigo-500 mr-2" />
// // //             <p>{profileInfo.designation}</p>
// // //           </div>
// // //           <div className="flex items-center">
// // //             <OfficeBuildingIcon className="h-6 w-6 text-indigo-500 mr-2" />
// // //             <p>{profileInfo.department}</p>
// // //           </div>
// // //           <div className="flex items-center">
// // //             <PhoneIcon className="h-6 w-6 text-indigo-500 mr-2" />
// // //             <p>{profileInfo.mobileNo}</p>
// // //           </div>
// // //           <div className="flex items-center">
// // //             <IdentificationIcon className="h-6 w-6 text-indigo-500 mr-2" />
// // //             <p>{profileInfo.pan}</p>
// // //           </div>
// // //         </div>

// // //         {/* Admin Edit Button */}
// // //         {isAdmin && (
// // //           <div className="text-center mt-8">
// // //             <Link
// // //               to={`/update-user/${profileInfo.id}`}
// // //               className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700"
// // //             >
// // //               Update Profile
// // //             </Link>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, { useState, useEffect } from "react";
// // import UserService from "../service/UserService";
// // import { Link } from "react-router-dom";
// // import { useAuth } from "../../AuthContext";
// // import {
// //   UserCircleIcon,
// //   MailIcon,
// //   BriefcaseIcon,
// //   OfficeBuildingIcon,
// //   PhoneIcon,
// //   IdentificationIcon,
// // } from "@heroicons/react/solid";

// // export default function ProfilePage() {
// //   const [profileInfo, setProfileInfo] = useState({});
// //   const { isAdmin } = useAuth();
// //   const [avatarStyle, setAvatarStyle] = useState("adventurer");
// //   const [seed, setSeed] = useState("default");

// //   useEffect(() => {
// //     fetchProfileInfo();
// //   }, []);

// //   const fetchProfileInfo = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await UserService.getYourProfile(token);
// //       setProfileInfo(response.user);
// //     } catch (error) {
// //       console.error("Error fetching profile information:", error);
// //     }
// //   };

// //   const avatarStyles = [
// //     "adventurer",
// //     "bottts",
// //     "avataaars",
// //     "croodles",
// //     "croodles-neutral",
// //     "pixel-art",
// //     "pixel-art-neutral",
// //     "miniavs",
// //     "shapes",
// //     "thumbs",
// //     "open-peeps",
// //   ];

// //   // New URL structure for DiceBear
// //   const avatarUrl = `https://api.dicebear.com/6.x/${avatarStyle}/svg?seed=${seed}`;

// //   const handleAvatarChange = () => {
// //     // Cycle through available styles
// //     const currentIndex = avatarStyles.indexOf(avatarStyle);
// //     const nextIndex = (currentIndex + 1) % avatarStyles.length;
// //     setAvatarStyle(avatarStyles[nextIndex]);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex flex-col items-center">
// //       {/* Profile Banner */}
// //       <div className="relative w-full h-48 bg-gradient-to-r from-blue-500 to-teal-400 flex justify-center items-center">
// //         <div className="absolute bottom-0 transform translate-y-1/2">
// //           <img
// //             src={avatarUrl}
// //             alt="Profile Avatar"
// //             className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
// //           />
// //           {/* <p className="mt-2 text-sm text-gray-600">Style: {avatarStyle}</p> */}

// //           <button
// //             onClick={handleAvatarChange}
// //             className="mt-3 px-4 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 focus:outline-none"
// //           >
// //             Change Avatar Style
// //           </button>
// //         </div>
// //       </div>

// //       {/* Profile Content */}
// //       <div className="bg-white shadow-lg rounded-lg mt-16 w-full max-w-3xl p-6">
// //         <div className="text-center">
// //           <h1 className="text-2xl font-semibold text-gray-800">
// //             {profileInfo.name}
// //           </h1>
// //           <p className="text-gray-500">{profileInfo.role}</p>
// //         </div>

// //         {/* Profile Stats */}
// //         <div className="mt-8 grid grid-cols-3 gap-4 text-center">
// //           <div>
// //             <h3 className="text-lg font-semibold text-gray-700">PAN</h3>
// //             <p className="text-gray-600">{profileInfo.pan}</p>
// //           </div>
// //           <div>
// //             <h3 className="text-lg font-semibold text-gray-700">Department</h3>
// //             <p className="text-gray-600">{profileInfo.department}</p>
// //           </div>
// //           <div>
// //             <h3 className="text-lg font-semibold text-gray-700">Phone</h3>
// //             <p className="text-gray-600">{profileInfo.mobileNo}</p>
// //           </div>
// //         </div>

// //         {/* Divider */}
// //         <hr className="my-8" />

// //         {/* Profile Details */}
// //         <div className="space-y-6">
// //           <div className="flex items-center">
// //             <MailIcon className="h-6 w-6 text-indigo-500 mr-2" />
// //             <p>{profileInfo.email}</p>
// //           </div>
// //           <div className="flex items-center">
// //             <BriefcaseIcon className="h-6 w-6 text-indigo-500 mr-2" />
// //             <p>{profileInfo.designation}</p>
// //           </div>
// //           <div className="flex items-center">
// //             <OfficeBuildingIcon className="h-6 w-6 text-indigo-500 mr-2" />
// //             <p>{profileInfo.department}</p>
// //           </div>
// //           <div className="flex items-center">
// //             <PhoneIcon className="h-6 w-6 text-indigo-500 mr-2" />
// //             <p>{profileInfo.mobileNo}</p>
// //           </div>
// //           <div className="flex items-center">
// //             <IdentificationIcon className="h-6 w-6 text-indigo-500 mr-2" />
// //             <p>{profileInfo.pan}</p>
// //           </div>
// //         </div>

// //         {/* Admin Edit Button */}
// //         {isAdmin && (
// //           <div className="text-center mt-8">
// //             <Link
// //               to={`/update-user/${profileInfo.id}`}
// //               className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700"
// //             >
// //               Update Profile
// //             </Link>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import UserService from "../service/UserService";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../AuthContext";
// import {
//   UserCircleIcon,
//   MailIcon,
//   BriefcaseIcon,
//   OfficeBuildingIcon,
//   PhoneIcon,
//   IdentificationIcon,
// } from "@heroicons/react/solid";

// export default function ProfilePage() {
//   const [profileInfo, setProfileInfo] = useState({});
//   const { isAdmin } = useAuth();
//   const [avatarStyle, setAvatarStyle] = useState("adventurer");
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [avatarUrl, setAvatarUrl] = useState(null); // Store uploaded avatar URL
//   const avatarStyles = [
//     "adventurer",
//     "bottts",
//     "avataaars",
//     "micah",
//     "croodles",
//     "croodles-neutral",
//     "pixel-art",
//     "pixel-art-neutral",
//     "miniavs",
//     "shapes",
//     "thumbs",
//     "open-peeps",
//   ];

//   useEffect(() => {
//     fetchProfileInfo();
//   }, []);

//   const fetchProfileInfo = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await UserService.getYourProfile(token);
//       setProfileInfo(response.user);
//       if (response.user.avatar) {
//         setAvatarUrl(response.user.avatar); // Set uploaded avatar URL if exists
//       }
//     } catch (error) {
//       console.error("Error fetching profile information:", error);
//     }
//   };

//   const handleAvatarChange = () => {
//     const randomIndex = Math.floor(Math.random() * avatarStyles.length);
//     setAvatarStyle(avatarStyles[randomIndex]);
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setAvatarFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setAvatarUrl(reader.result); // Preview the uploaded avatar
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAvatarUpload = async () => {
//     if (!avatarFile) return; // No file selected

//     const formData = new FormData();
//     formData.append("avatar", avatarFile);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await UserService.updateAvatar(token, formData);
//       setProfileInfo((prevProfile) => ({
//         ...prevProfile,
//         avatar: response.avatar, // Update the profile with new avatar
//       }));
//       setAvatarUrl(response.avatar); // Update the avatar preview
//     } catch (error) {
//       console.error("Error uploading avatar:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center">
//       {/* Profile Banner */}
//       <div className="relative w-full h-48 bg-gradient-to-r from-blue-500 to-teal-400 flex justify-center items-center">
//         <div className="absolute bottom-0 transform translate-y-1/2 flex flex-col items-center">
//           {/* Avatar */}
//           <div className="flex justify-center mb-2">
//             <img
//               src={
//                 avatarUrl ||
//                 `https://api.dicebear.com/6.x/${avatarStyle}/svg?seed=${profileInfo.id}`
//               }
//               alt="Profile Avatar"
//               className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
//             />
//           </div>
//           {/* Button to Change Avatar Style */}
//           <button
//             onClick={handleAvatarChange}
//             className="mt-2 px-3 py-1 bg-indigo-500 text-white rounded-md shadow hover:bg-indigo-600"
//           >
//             Change Avatar Style
//           </button>

//           <div className="mt-4">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="text-sm text-gray-700"
//             />
//             <button
//               onClick={handleAvatarUpload}
//               className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
//             >
//               Upload Avatar
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Profile Content */}
//       <div className="bg-white shadow-lg rounded-lg mt-16 w-full max-w-3xl p-6">
//         <div className="text-center">
//           <h1 className="text-2xl font-semibold text-gray-800">
//             {profileInfo.name}
//           </h1>
//           <p className="text-gray-500">{profileInfo.role}</p>
//         </div>

//         {/* Profile Stats */}
//         <div className="mt-8 grid grid-cols-3 gap-4 text-center">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-700">PAN</h3>
//             <p className="text-gray-600">{profileInfo.pan}</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-gray-700">Department</h3>
//             <p className="text-gray-600">{profileInfo.department}</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-gray-700">Phone</h3>
//             <p className="text-gray-600">{profileInfo.mobileNo}</p>
//           </div>
//         </div>

//         {/* Divider */}
//         <hr className="my-8" />

//         {/* Profile Details */}
//         <div className="space-y-6">
//           <div className="flex items-center">
//             <MailIcon className="h-6 w-6 text-indigo-500 mr-2" />
//             <p>{profileInfo.email}</p>
//           </div>
//           <div className="flex items-center">
//             <BriefcaseIcon className="h-6 w-6 text-indigo-500 mr-2" />
//             <p>{profileInfo.designation}</p>
//           </div>
//           <div className="flex items-center">
//             <OfficeBuildingIcon className="h-6 w-6 text-indigo-500 mr-2" />
//             <p>{profileInfo.department}</p>
//           </div>
//           <div className="flex items-center">
//             <PhoneIcon className="h-6 w-6 text-indigo-500 mr-2" />
//             <p>{profileInfo.mobileNo}</p>
//           </div>
//           <div className="flex items-center">
//             <IdentificationIcon className="h-6 w-6 text-indigo-500 mr-2" />
//             <p>{profileInfo.pan}</p>
//           </div>
//         </div>

//         {/* Admin Edit Button */}
//         {isAdmin && (
//           <div className="text-center mt-8">
//             <Link
//               to={`/update-user/${profileInfo.id}`}
//               className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700"
//             >
//               Update Profile
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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
