import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm">
          © {new Date().getFullYear()} BiteBooking. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
