import { useNavigate } from "react-router-dom";
import { loader } from '../assets';
import FundCard from "./FundCard";
interface DisplayCampaignsProps
{
    title: string;
    isLoading: boolean;
    campaigns: any[];
}
export default function DisplayCampaigns({ title, isLoading, campaigns }: DisplayCampaignsProps)
{
    const navigate = useNavigate();

    const handleNavigate = (campaign: { title: any; }) =>
    {
        navigate(`/campaign-details/${campaign.title}`, { state: campaign })
    }
    return (
        <div>
            <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>

            <div className="flex flex-wrap gap-[26px] mt-[20px]">
                {isLoading ? (
                    <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />) : null}
                {!isLoading && campaigns.length === 0 ? (
                    <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                        You have not created any Campaigns yet
                    </p>
                ) : null}

                {!isLoading && campaigns.length > 0 ? (
                    campaigns.map((campaign) => (
                        <FundCard key={campaign.id}
                            {...campaign}
                            handleClick={() => handleNavigate(campaign)} />
                    ))) : null}
            </div>
        </div>
    )
}
