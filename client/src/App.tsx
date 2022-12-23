// import { ConnectWallet } from "@thirdweb-dev/react";
import { Route, Routes } from 'react-router-dom';
import { Navbar, Sidebar } from './components';
import { CampaignDetails, CreateCampaign, HomePage, Profile } from './pages';
import "./styles/Home.css";
export default function Home()
{
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 underline">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />

        </Routes>
      </div>
    </div>

  );
}
