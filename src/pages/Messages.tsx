
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Messaging from "@/components/Messaging";

const Messages = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        <Messaging />
      </div>
      
      <Footer />
    </div>
  );
};

export default Messages;
