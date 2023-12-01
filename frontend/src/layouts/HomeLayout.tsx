import Navbar from "@/components/Navbar";
import { useUser } from "@/contexts/authContext";
import React from "react";
import { Navigate, useOutlet } from "react-router-dom";

interface IHomeLayoutProps { }

const HomeLayout: React.FC<IHomeLayoutProps> = ({ }) => {
  const user = useUser();
  const outlet = useOutlet();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (user) setLoading(false);
  }, [user]);

  if (loading) return <div />;

  if (!user) return <Navigate to="/auth/signin" />;


  return (
    <div className="tracking-wider font-poppins scrollbar-hide">
      <Navbar />
      <div className="grid content-center bg-black text-white w-screen px-5 md:px-10 ">{outlet}</div>
    </div>
  );
};

export default HomeLayout;