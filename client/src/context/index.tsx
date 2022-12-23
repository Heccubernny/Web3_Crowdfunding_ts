import { useAddress, useContract, useContractWrite, useMetamask } from '@thirdweb-dev/react';
import { SmartContract } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';
import React, { createContext, useContext } from 'react';
const StateContext = createContext<StateContextValueProps>({
  address: '',
  contract: undefined,
  connect: () => { },
  createCampaign: () => { },
  getUserCampaigns: () => { },
  getCampaigns: () => { },
  donate: () => { },
  getDonations: () => { },
});

interface StateContextValueProps
{
  address: any,
  contract: SmartContract<ethers.BaseContract> | undefined,
  connect: any,
  createCampaign: any,
  getUserCampaigns: any,
  getCampaigns: any,
  donate: any,
  getDonations: any,
}

export function StateContextProvider({ children }: { children: React.ReactNode }): JSX.Element
{
  // Connecting to the Smart Contract
  const { contract } = useContract(process.env.CONTRACT_NO);

  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  // Collecting the address of Smart Wallet
  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form: any) =>
  {
    try
    {
      const data = await createCampaign([
        address, //owner
        form.title, //title
        form.description, //description
        form.target, //target
        new Date(form.deadline).getTime(), //daadline
        form.image
      ])
      console.log("contract call success", data)

    } catch (err)
    {
      console.log("contract call failure", err)
    }
  }

  const getCampaigns: () => any = async () =>
  {
    const campaigns = await contract?.call('getCampaigns');

    const parsedCampaigns = campaigns.map((campaign: any, i: number | String) => ({
      pId: i,
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      image: campaign.image,
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      // isCompleted: campaign.isCompleted,
    }));

    return parsedCampaigns;
  }

  const getUserCampaigns: () => Promise<any> = async () =>
  {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign: any) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async (pId: number | string, amount: string) =>
  {
    const data = await contract?.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount) });
    return data;
  }

  const getDonations = async (pId: number | String) =>
  {
    const donations = await contract?.call('getDonators', pId);
    const donatorAmounts = donations[ 0 ].length;

    const parsedDonations = [];

    for (let i = 0; i < donatorAmounts; i++)
    {
      parsedDonations.push({
        donator: donations[ 0 ][ i ],
        donatorAmount: ethers.utils.formatEther(donations[ 1 ][ i ].toString())
      })
    }

    return parsedDonations;

  }

  return (

    <StateContext.Provider value={{ address, contract, connect, createCampaign: publishCampaign, getCampaigns, getUserCampaigns, donate, getDonations }}>
      {children}
    </ StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
