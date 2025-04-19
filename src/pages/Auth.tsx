
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthTabs from "@/components/auth/AuthTabs";

const Auth = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gigconnect-threads-bg text-gigconnect-threads-text">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AuthTabs />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Auth;
