import { useEffect, useState } from "react";
import DisplayCampaigns from "../components/DisplayCampaigns";
import { useStateContext } from "../context";

export default function Profile()
{
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ campaigns, setCampaigns ] = useState<string[]>([])

    const { address, contract, getUserCampaigns } = useStateContext();

    const fetchCampaigns = async () =>
    {
        setIsLoading(true);
        const campaigns = await getUserCampaigns();
        setCampaigns(campaigns);
        setIsLoading(false);
    }

    useEffect(() =>
    {
        if (contract) fetchCampaigns();
    }, [ address, contract ])
    return (
        <DisplayCampaigns title="All Campaigns" isLoading={isLoading} campaigns={campaigns} />
    )
}
