// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    // like object
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donatorAmounts;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256){
        Campaign storage newCampaign = campaigns[numberOfCampaigns];

        require(newCampaign.deadline < block.timestamp, "Deadline must be in the future.");
        // require(bytes(newCampaign.target).length > 0, "Target number must be greater than 0.");
        require(bytes(newCampaign.title).length > 0, "Title must be provided.");
        require(bytes(newCampaign.description).length > 0, "Description must be provided.");
        require(bytes(newCampaign.image).length > 0, "Image must be provided.");

        newCampaign.owner = _owner;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.target = _target;
        newCampaign.deadline = _deadline;
        newCampaign.image = _image;
        newCampaign.amountCollected = 0;
        numberOfCampaigns++;
        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _campaignId) public payable {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_campaignId];
        // campaign.amountCollected += msg.value;
        campaign.donators.push(msg.sender);
        campaign.donatorAmounts.push(amount);

        (bool success, ) = payable(campaign.owner).call{value: amount}("");
        require(success, "Failed to send Ether");

        if(success){
            campaign.amountCollected += amount;
        }
    }

    function getDonators(uint256 _campaignId)
        public
        view
        returns (address[] memory, uint256[] memory)
    {
        return (campaigns[_campaignId].donators, campaigns[_campaignId].donatorAmounts);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage campaign = campaigns[i];
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
    }

}
